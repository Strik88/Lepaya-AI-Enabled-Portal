import { MainLayout } from '@/components/layout/main-layout';

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
} 