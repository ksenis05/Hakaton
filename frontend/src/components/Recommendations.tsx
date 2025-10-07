import React from 'react';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="tab-bar">
      <button 
        className={`tab ${activeTab === 'recommendations' ? 'active' : ''}`}
        onClick={() => onTabChange('recommendations')}
      >
        👥 Рекомендации
      </button>
      <button 
        className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => onTabChange('profile')}
      >
        👤 Профиль
      </button>
    </nav>
  );
};

export default TabBar;