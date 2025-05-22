
import React from 'react';

interface Tab {
  name: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabName: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="mb-8 border-b border-gray-700">
      <nav className="-mb-px flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => onTabChange(tab.name)}
            className={`
              ${tab.name === activeTab
                ? 'border-primary-500 text-primary-400'
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              }
              group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150
            `}
            aria-current={tab.name === activeTab ? 'page' : undefined}
          >
            {tab.icon && <span className="mr-2 w-5 h-5">{tab.icon}</span>}
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
