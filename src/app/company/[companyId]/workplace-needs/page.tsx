import * as React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { WorkplaceNeedsList } from '@/components/workplace-needs/workplace-needs-list';

interface WorkplaceNeedsPageProps {
  params: {
    companyId: string;
  };
}

export default function WorkplaceNeedsPage({ params }: WorkplaceNeedsPageProps) {
  const { companyId } = params;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#2C3138]">Workplace Needs</h2>
            <p className="text-sm text-[#2C3138] mt-1">
              Manage and monitor the workplace needs for different target audiences.
            </p>
          </div>
          <Link href={`/company/${companyId}/workplace-needs/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Workplace Need
            </Button>
          </Link>
        </div>
        
        <WorkplaceNeedsList companyId={companyId} />
      </div>
    </div>
  );
} 