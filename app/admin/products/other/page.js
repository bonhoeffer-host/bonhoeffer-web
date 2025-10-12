'use client'
import DatabaseManager from '../../../../components/admin/DatabaseManager';

export default function ProductsOtherPage() {
  return (
    <DatabaseManager
      database="products-other"
      title="Additional Information"
      description="Manage additional model information"
      backPath="/admin/products"
    />
  );
}