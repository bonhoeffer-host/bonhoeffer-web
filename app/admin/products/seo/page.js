'use client'
import DatabaseManager from '../../../../components/admin/DatabaseManager';

export default function ProductsSeoPage() {
  return (
    <DatabaseManager
      database="products-seo"
      title="Product SEO"
      description="Manage SEO metadata and optimization"
      backPath="/admin/products"
    />
  );
}