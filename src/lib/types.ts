import { FileInfo } from '@/components/ui/file-upload';

export type TargetAudience = 'Young Talent' | 'Professional' | 'Leader' | 'Commercial';

export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface CompanyProfile {
  id: string;
  companyId: string;
  organizationDescription: string;
  revenueGeneration: string;
  industryInformation: string;
  challenges: string;
  strategicPriorities: string;
  additionalInformation?: string;
  links: Link[];
  files: FileInfo[];
}

export interface Link {
  id: string;
  title: string;
  url: string;
}

export interface WorkplaceNeed {
  id: string;
  companyId: string;
  targetAudience: TargetAudience;
  audienceCharacteristics: string;
  businessGoals: string;
  challenges: string;
  successMetrics: string;
  desiredBehaviors: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Program {
  id: string;
  companyId: string;
  name: string;
  description?: string;
  targetAudience: TargetAudience;
  waves: Wave[];
  startDate?: Date;
  endDate?: Date;
}

export interface Wave {
  id: string;
  programId: string;
  name: string;
  startDate?: Date;
  endDate?: Date;
  participantCount?: number;
}

export interface Employee {
  id: string;
  companyId: string;
  name: string;
  email: string;
  role: string;
  accessLevel: 'Admin' | 'User' | 'ReadOnly';
  targetAudience?: TargetAudience;
  avatar?: string;
}

// Mock data
export const MOCK_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    logoUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'TechGlobal',
    logoUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'FinanceWorld',
    logoUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'Healthcare Partners',
    logoUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '5',
    name: 'Retail Innovators',
    logoUrl: 'https://via.placeholder.com/150',
  },
]; 