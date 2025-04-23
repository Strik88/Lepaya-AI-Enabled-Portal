import * as React from 'react';
import { CompanyProfileForm } from '@/components/forms/company-profile-form';

interface CompanyProfilePageProps {
  params: {
    companyId: string;
  };
}

export default function CompanyProfilePage({ params }: CompanyProfilePageProps) {
  const { companyId } = params;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#2C3138] mb-4">Company Profile</h2>
        <p className="text-sm text-[#2C3138] mb-6">
          Complete the company profile to help tailor learning programs to their specific needs.
        </p>
        
        <CompanyProfileForm companyId={companyId} />
      </div>
    </div>
  );
} 