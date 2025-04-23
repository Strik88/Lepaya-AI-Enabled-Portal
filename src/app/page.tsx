import { redirect } from 'next/navigation';
import { MOCK_COMPANIES } from '@/lib/types';
import Image from "next/image";

export default function Home() {
  const firstCompany = MOCK_COMPANIES[0];
  redirect(`/company/${firstCompany.id}/profile`);
  
  // This will never be rendered because of the redirect
  return null;
}
