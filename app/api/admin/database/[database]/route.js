import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Database ID mapping
const DATABASE_IDS = {
  'products-category': process.env.NOTION_PRODUCT_CATEGORIES_DATABASE_ID,
  'products-info': process.env.NOTION_PRODUCT_INFO_DATABASE_ID,
  'products-seo': process.env.NOTION_PRODUCT_DETAILS_DATABASE_ID,
  'products-meta': process.env.NOTION_PRODUCT_DETAILS_DATABASE_ID,
  'products-model': process.env.NOTION_PRODUCT_MODELS_DATABASE_ID,
  'products-other': process.env.NOTION_OTHER_MODELS_DATABASE_ID,
  'products-faqs': process.env.NOTION_MODEL_FAQS_DATABASE_ID,
  'spare-parts-category': process.env.NOTION_PRODUCT_CATEGORIES_DATABASE_ID,
  'spare-parts-product': process.env.NOTION_SPARE_PARTS_DATABASE_ID,
  'spare-parts-model': process.env.NOTION_MODELS_DATABASE_ID,
};

// GET - Fetch records from database
export async function GET(request, { params }) {
  try {
    const { database } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const searchTerm = searchParams.get('search') || '';
    const sortField = searchParams.get('sortField') || '';
    const sortDirection = searchParams.get('sortDirection') || 'asc';
    const startCursor = searchParams.get('cursor');

    // Extract filters
    const filters = {};
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('filter_') && value) {
        const filterField = key.replace('filter_', '');
        filters[filterField] = value;
      }
    }

    const databaseId = DATABASE_IDS[database];
    if (!databaseId) {
      return NextResponse.json({ error: 'Database not found' }, { status: 404 });
    }

    // Get database schema first
    const databaseInfo = await notion.databases.retrieve({
      database_id: databaseId,
    });

    const schema = {};
    const requiredFields = [];
    
    Object.entries(databaseInfo.properties).forEach(([name, property]) => {
      schema[name] = {
        type: property.type,
        id: property.id,
        name: name,
      };
      
      // Mark as required if it's a title field or contains key terms
      if (property.type === 'title' || 
          name.toLowerCase().includes('name') || 
          name.toLowerCase().includes('title') ||
          name.toLowerCase() === 'id') {
        requiredFields.push(name);
      }
    });

    // Build query filters and sorts
    const queryFilter = buildNotionFilter(searchTerm, filters, schema);
    const querySort = buildNotionSort(sortField, sortDirection, schema);

    // For pagination, we need to get all records to calculate total
    // First, get a count by fetching all records (Notion limitation)
    let allRecordsCount = 0;
    let hasMoreRecords = true;
    let countCursor = undefined;

    // Get total count (this is expensive but necessary for proper pagination)
    while (hasMoreRecords && allRecordsCount < 1000) { // Limit to prevent infinite loops
      const countQuery = {
        database_id: databaseId,
        page_size: 100, // Max page size for counting
      };
      
      if (queryFilter) {
        countQuery.filter = queryFilter;
      }

      if (countCursor) {
        countQuery.start_cursor = countCursor;
      }

      const countResponse = await notion.databases.query(countQuery);
      allRecordsCount += countResponse.results.length;
      hasMoreRecords = countResponse.has_more;
      countCursor = countResponse.next_cursor;
    }

    // Now get the actual page of records
    const actualQuery = {
      database_id: databaseId,
      page_size: limit,
    };

    if (queryFilter) {
      actualQuery.filter = queryFilter;
    }

    if (querySort.length > 0) {
      actualQuery.sorts = querySort;
    }

    // Calculate offset for proper pagination
    const offset = (page - 1) * limit;
    let currentOffset = 0;
    let pageCursor = undefined;

    // Skip to the correct page
    while (currentOffset < offset && pageCursor !== null) {
      const skipQuery = {
        database_id: databaseId,
        page_size: Math.min(100, offset - currentOffset),
      };

      if (queryFilter) {
        skipQuery.filter = queryFilter;
      }

      if (querySort.length > 0) {
        skipQuery.sorts = querySort;
      }
      
      if (pageCursor) {
        skipQuery.start_cursor = pageCursor;
      }

      const skipResponse = await notion.databases.query(skipQuery);
      currentOffset += skipResponse.results.length;
      pageCursor = skipResponse.next_cursor;
      
      if (!skipResponse.has_more) break;
    }

    // Get the actual records for this page
    if (pageCursor) {
      actualQuery.start_cursor = pageCursor;
    }

    const response = await notion.databases.query(actualQuery);

    // Transform the response
    const records = response.results.map(page => {
      const record = {
        id: page.id,
        created_time: page.created_time,
        last_edited_time: page.last_edited_time,
        properties: {},
      };
      
      Object.entries(page.properties).forEach(([name, property]) => {
        record.properties[name] = extractPropertyValue(property);
      });
      
      return record;
    });

    return NextResponse.json({
      records,
      schema,
      requiredFields,
      totalRecords: allRecordsCount,
      pagination: {
        hasMore: response.has_more,
        nextCursor: response.next_cursor,
        page,
        limit,
        total: records.length,
        totalRecords: allRecordsCount,
        totalPages: Math.ceil(allRecordsCount / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching database records:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create new record
export async function POST(request, { params }) {
  try {
    const { database } = await params;
    const body = await request.json();

    const databaseId = DATABASE_IDS[database];
    if (!databaseId) {
      return NextResponse.json({ error: 'Database not found' }, { status: 404 });
    }

    // Get database schema to determine property types
    const databaseInfo = await notion.databases.retrieve({
      database_id: databaseId,
    });

    const notionProperties = {};
    
    // Convert properties to Notion format
    Object.entries(body).forEach(([name, value]) => {
      const propertySchema = databaseInfo.properties[name];
      if (propertySchema && value !== undefined && value !== null && value !== '') {
        notionProperties[name] = convertToNotionProperty(value, propertySchema.type);
      }
    });

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: notionProperties,
    });

    return NextResponse.json({ success: true, id: response.id });

  } catch (error) {
    console.error('Error creating record:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Helper function to extract property values
function extractPropertyValue(property) {
  switch (property.type) {
    case 'title':
      return property.title?.[0]?.plain_text || '';
    case 'rich_text':
      return property.rich_text?.map(text => text.plain_text).join('') || '';
    case 'number':
      return property.number || null;
    case 'select':
      return property.select?.name || null;
    case 'multi_select':
      return property.multi_select?.map(option => option.name) || [];
    case 'date':
      return property.date?.start || null;
    case 'checkbox':
      return property.checkbox || false;
    case 'url':
      return property.url || '';
    case 'email':
      return property.email || '';
    case 'phone_number':
      return property.phone_number || '';
    case 'relation':
      return property.relation?.map(rel => rel.id) || [];
    case 'people':
      return property.people?.map(person => person.name || person.id) || [];
    case 'files':
      return property.files?.map(file => file.file?.url || file.external?.url) || [];
    default:
      return property[property.type] || null;
  }
}

// Helper function to convert values to Notion property format
function convertToNotionProperty(value, type) {
  switch (type) {
    case 'title':
      return {
        title: [{ text: { content: String(value) || '' } }]
      };
    case 'rich_text':
      return {
        rich_text: [{ text: { content: String(value) || '' } }]
      };
    case 'number':
      return {
        number: typeof value === 'number' ? value : parseFloat(value) || null
      };
    case 'select':
      return {
        select: value ? { name: String(value) } : null
      };
    case 'multi_select':
      return {
        multi_select: Array.isArray(value) ? value.map(v => ({ name: String(v) })) : []
      };
    case 'date':
      return {
        date: value ? { start: value } : null
      };
    case 'checkbox':
      return {
        checkbox: Boolean(value)
      };
    case 'url':
      return {
        url: String(value) || null
      };
    case 'email':
      return {
        email: String(value) || null
      };
    case 'phone_number':
      return {
        phone_number: String(value) || null
      };
    default:
      return {
        rich_text: [{ text: { content: String(value) || '' } }]
      };
  }
}

// Helper function to build Notion filter
function buildNotionFilter(searchTerm, filters, schema) {
  const conditions = [];

  // Add search filter (search across text fields)
  if (searchTerm) {
    const searchConditions = [];
    Object.entries(schema).forEach(([fieldName, fieldSchema]) => {
      if (['title', 'rich_text', 'select', 'multi_select'].includes(fieldSchema.type)) {
        if (fieldSchema.type === 'title') {
          searchConditions.push({
            property: fieldName,
            title: {
              contains: searchTerm
            }
          });
        } else if (fieldSchema.type === 'rich_text') {
          searchConditions.push({
            property: fieldName,
            rich_text: {
              contains: searchTerm
            }
          });
        } else if (fieldSchema.type === 'select') {
          searchConditions.push({
            property: fieldName,
            select: {
              contains: searchTerm
            }
          });
        }
      }
    });
    
    if (searchConditions.length > 0) {
      conditions.push({
        or: searchConditions
      });
    }
  }

  // Add specific field filters
  Object.entries(filters).forEach(([fieldName, value]) => {
    const fieldSchema = schema[fieldName];
    if (!fieldSchema || !value) return;

    switch (fieldSchema.type) {
      case 'title':
        conditions.push({
          property: fieldName,
          title: {
            contains: value
          }
        });
        break;
      case 'rich_text':
        conditions.push({
          property: fieldName,
          rich_text: {
            contains: value
          }
        });
        break;
      case 'number':
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          conditions.push({
            property: fieldName,
            number: {
              equals: numValue
            }
          });
        }
        break;
      case 'select':
        conditions.push({
          property: fieldName,
          select: {
            equals: value
          }
        });
        break;
      case 'checkbox':
        conditions.push({
          property: fieldName,
          checkbox: {
            equals: value === 'true'
          }
        });
        break;
      case 'date':
        conditions.push({
          property: fieldName,
          date: {
            equals: value
          }
        });
        break;
      case 'url':
      case 'email':
      case 'phone_number':
        conditions.push({
          property: fieldName,
          [fieldSchema.type]: {
            contains: value
          }
        });
        break;
    }
  });

  if (conditions.length === 0) return null;
  if (conditions.length === 1) return conditions[0];
  
  return {
    and: conditions
  };
}

// Helper function to build Notion sort
function buildNotionSort(sortField, sortDirection, schema) {
  if (!sortField || !schema[sortField]) return [];

  const fieldSchema = schema[sortField];
  let sortProperty = {
    property: sortField,
    direction: sortDirection === 'desc' ? 'descending' : 'ascending'
  };

  // Special handling for different field types
  switch (fieldSchema.type) {
    case 'created_time':
    case 'last_edited_time':
      sortProperty = {
        timestamp: fieldSchema.type,
        direction: sortDirection === 'desc' ? 'descending' : 'ascending'
      };
      break;
  }

  return [sortProperty];
}