import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Users, 
  Award, 
  BarChart3, 
  Settings, 
  ChevronDown, 
  LogOut, 
  Menu, 
  X,
  Search
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Company, MOCK_COMPANIES } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [selectedCompany, setSelectedCompany] = React.useState<Company>(MOCK_COMPANIES[0]);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = React.useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Company Profile',
      href: `/company/${selectedCompany.id}/profile`,
      icon: Building2,
      current: pathname?.includes(`/company/${selectedCompany.id}/profile`),
    },
    {
      name: 'Workplace Needs',
      href: `/company/${selectedCompany.id}/workplace-needs`,
      icon: BarChart3,
      current: pathname?.includes(`/company/${selectedCompany.id}/workplace-needs`),
    },
    {
      name: 'Programs',
      href: `/company/${selectedCompany.id}/programs`,
      icon: Award,
      current: pathname?.includes(`/company/${selectedCompany.id}/programs`),
    },
    {
      name: 'Employees',
      href: `/company/${selectedCompany.id}/employees`,
      icon: Users,
      current: pathname?.includes(`/company/${selectedCompany.id}/employees`),
    },
    {
      name: 'Configuration',
      href: `/company/${selectedCompany.id}/configuration`,
      icon: Settings,
      current: pathname?.includes(`/company/${selectedCompany.id}/configuration`),
    },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  
  const toggleCompanyDropdown = () => setIsCompanyDropdownOpen(!isCompanyDropdownOpen);
  const closeCompanyDropdown = () => setIsCompanyDropdownOpen(false);

  const selectCompany = (company: Company) => {
    setSelectedCompany(company);
    closeCompanyDropdown();
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden" 
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#EFEFEF] flex flex-col transition-transform lg:translate-x-0 lg:static lg:z-auto',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-4 border-b border-[#EFEFEF] flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-[#2C3138]">Lepaya</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden" 
            onClick={closeSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative p-4 border-b border-[#EFEFEF]">
          <button
            type="button"
            className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-[#2C3138] rounded-md hover:bg-[#F6F6FE]"
            onClick={toggleCompanyDropdown}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-[#4E4CEC] rounded-full flex items-center justify-center mr-2">
                <span className="text-xs text-white font-bold">
                  {selectedCompany.name.charAt(0)}
                </span>
              </div>
              <span className="truncate max-w-[150px]">{selectedCompany.name}</span>
            </div>
            <ChevronDown className={cn("h-4 w-4 transition-transform", isCompanyDropdownOpen && "transform rotate-180")} />
          </button>

          {isCompanyDropdownOpen && (
            <div className="absolute left-4 right-4 mt-1 bg-white rounded-md shadow-lg z-10 border border-[#EFEFEF] max-h-60 overflow-y-auto">
              <div className="p-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#C0C0C0]" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    className="w-full pl-8 pr-2 py-2 text-sm rounded-md border border-[#EFEFEF] focus:outline-none focus:ring-1 focus:ring-[#4E4CEC] focus:border-[#4E4CEC]"
                  />
                </div>
              </div>
              <div className="py-1">
                {MOCK_COMPANIES.map((company) => (
                  <button
                    key={company.id}
                    className={cn(
                      'flex items-center w-full px-4 py-2 text-sm text-[#2C3138]',
                      selectedCompany.id === company.id ? 'bg-[#F6F6FE] text-[#4E4CEC]' : 'hover:bg-[#F6F6FE]'
                    )}
                    onClick={() => selectCompany(company)}
                  >
                    <div className="w-6 h-6 bg-[#4E4CEC] rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs text-white font-bold">
                        {company.name.charAt(0)}
                      </span>
                    </div>
                    <span className="truncate">{company.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                item.current
                  ? 'bg-[#F6F6FE] text-[#4E4CEC]'
                  : 'text-[#2C3138] hover:bg-[#F6F6FE] hover:text-[#4E4CEC]'
              )}
              onClick={closeSidebar}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5',
                  item.current ? 'text-[#4E4CEC]' : 'text-[#C0C0C0]'
                )}
              />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#EFEFEF]">
          <Button
            variant="ghost"
            className="w-full justify-start text-[#2C3138] hover:bg-[#F6F6FE]"
          >
            <LogOut className="mr-2 h-5 w-5 text-[#C0C0C0]" />
            Log out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-[#EFEFEF] py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-4 lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-bold text-[#2C3138]">
              {navigation.find((item) => item.current)?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-8 h-8 bg-[#4E4CEC] rounded-full flex items-center justify-center">
                <span className="text-sm text-white font-bold">US</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-[#F6F6F6] p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 