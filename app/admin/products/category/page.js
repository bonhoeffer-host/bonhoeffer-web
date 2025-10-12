'use client'
import DatabaseManager from '../../../../components/admin/DatabaseManager';

export default function ProductsCategoryPage() {
  return (
    <DatabaseManager
      database="products-category"
      title="Product Categories"
      description="Manage product categories and their organization"
      backPath="/admin/products"
    />
  );
}