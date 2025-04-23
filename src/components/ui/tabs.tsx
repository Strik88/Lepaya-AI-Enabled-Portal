import * as React from 'react';
import { cn } from '@/lib/utils';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
}

interface TabsProps {
  defaultTab: string;
  children: React.ReactNode;
  className?: string;
}

function Tabs({ defaultTab, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  const value = React.useMemo(() => ({
    activeTab,
    setActiveTab,
  }), [activeTab]);

  return (
    <TabsContext.Provider value={value}>
      <div className={cn('w-full', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

function TabList({ children, className }: TabListProps) {
  return (
    <div className={cn('flex space-x-1 border-b border-[#EFEFEF]', className)}>
      {children}
    </div>
  );
}

interface TabTriggerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

function TabTrigger({ id, children, className }: TabTriggerProps) {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        'px-4 py-2 font-medium text-sm transition-colors focus:outline-none',
        activeTab === id ? 
          'text-[#4E4CEC] border-b-2 border-[#4E4CEC]' : 
          'text-[#2C3138] hover:text-[#4E4CEC]',
        className
      )}
    >
      {children}
    </button>
  );
}

interface TabContentProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

function TabContent({ id, children, className }: TabContentProps) {
  const { activeTab } = useTabs();

  if (activeTab !== id) return null;

  return (
    <div className={cn('mt-4', className)}>
      {children}
    </div>
  );
}

export { Tabs, TabList, TabTrigger, TabContent }; 