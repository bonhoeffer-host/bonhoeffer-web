'use client'
import DatabaseManager from '../../../../components/admin/DatabaseManager';

export default function ProductsInfoPage() {
  return (
    <DatabaseManager
      database="products-info"
      title="Product Information"
      description="Manage basic product information and details"
      backPath="/admin/products"
    />
  );
}