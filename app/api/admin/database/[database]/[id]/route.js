import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// GET - Fetch single record
export async function GET(request, { params }) {
  try {
    const { database, id } = await params;

    const response = await notion.pages.retrieve({
      page_id: id,
    });

    // Transform the response
    const record = {
      id: response.id,
      created_time: response.created_time,
      last_edited_time: response.last_edited_time,
      properties: {},
    };
    
    Object.entries(response.properties).forEach(([name, property]) => {
      record.properties[name] = extractPropertyValue(property);
    });

    return NextResponse.json({ record });

  } catch (error) {
    console.error('Error fetching record:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Update record
export async function PUT(request, { params }) {
  try {
    const { database, id } = await params;
    const body = await request.json();

    // Get the page to understand its current structure
    const page = await notion.pages.retrieve({ page_id: id });
    
    const notionProperties = {};
    
    // Convert properties to Notion format
    Object.entries(body).forEach(([name, value]) => {
      const existingProperty = page.properties[name];
      if (existingProperty && value !== undefined) {
        const propertyType = existingProperty.type;
        if (value !== null && value !== '') {
          notionProperties[name] = convertToNotionProperty(value, propertyType);
        }
      }
    });

    const response = await notion.pages.update({
      page_id: id,
      properties: notionProperties,
    });

    return NextResponse.json({ success: true, id: response.id });

  } catch (error) {
    console.error('Error updating record:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Archive record
export async function DELETE(request, { params }) {
  try {
    const { database, id } = await params;

    const response = await notion.pages.update({
      page_id: id,
      archived: true,
    });

    return NextResponse.json({ success: true, id: response.id });

  } catch (error) {
    console.error('Error deleting record:', error);
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