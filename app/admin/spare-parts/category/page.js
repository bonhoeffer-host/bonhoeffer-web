'use client'
import DatabaseManager from '../../../../components/admin/DatabaseManager';

export default function SparePartsCategoryPage() {
  return (
    <DatabaseManager
      database="spare-parts-category"
      title="Spare Parts Categories"
      description="Manage spare parts categories and organization"
      backPath="/admin/spare-parts"
    />
  );
}