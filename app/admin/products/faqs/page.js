'use client'
import DatabaseManager from '../../../../components/admin/DatabaseManager';

export default function ProductsFaqsPage() {
  return (
    <DatabaseManager
      database="products-faqs"
      title="Product FAQs"
      description="Manage frequently asked questions"
      backPath="/admin/products"
    />
  );
}