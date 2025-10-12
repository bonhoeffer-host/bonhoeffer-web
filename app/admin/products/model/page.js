'use client'
import DatabaseManager from '../../../../components/admin/DatabaseManager';

export default function ProductsModelPage() {
  return (
    <DatabaseManager
      database="products-model"
      title="Product Models"
      description="Manage model specifications and details"
      backPath="/admin/products"
    />
  );
}