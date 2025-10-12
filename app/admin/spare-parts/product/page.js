'use client'
import DatabaseManager from '../../../../components/admin/DatabaseManager';

export default function SparePartsProductPage() {
  return (
    <DatabaseManager
      database="spare-parts-product"
      title="Spare Parts Products"
      description="Manage spare parts products and their details"
      backPath="/admin/spare-parts"
    />
  );
}