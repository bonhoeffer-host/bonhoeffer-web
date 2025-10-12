'use client'
import DatabaseManager from '../../../../components/admin/DatabaseManager';

export default function SparePartsModelPage() {
  return (
    <DatabaseManager
      database="spare-parts-model"
      title="Spare Parts Models"
      description="Manage spare parts models and compatibility"
      backPath="/admin/spare-parts"
    />
  );
}