'use client'
import DatabaseManager from '../../../../components/admin/DatabaseManager';

export default function ProductsMetaPage() {
  return (
    <DatabaseManager
      database="products-meta"
      title="Product Metadata"
      description="Manage product metadata and attributes"
      backPath="/admin/products"
    />
  );
}