'use client';

import { useState } from 'react';
import { NavPage, NavConfig } from '@/lib/types';

interface TopbarProps {
  currentPage: NavPage;
  navConfig: Record<NavPage, NavConfig>;
  time: string;
}

export default function Topbar({ currentPage, navConfig, time }: TopbarProps) {
  const [activeTab, setActiveTab] = useState(0);
  const config = navConfig[currentPage];

  return (
    <div className="topbar">
      <div className="topbar-section">
        {config.title} <span>{config.sub}</span>
      </div>
      
      <div className="topbar-tabs">
        {config.tabs.map((tab, index) => (
          <div
            key={tab}
            className={`topbar-tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </div>
        ))}
      </div>
      
      <div className="topbar-right">
        <div className="topbar-clock">{time} PST</div>
        <div className="topbar-govph">Republic of the Philippines</div>
      </div>
    </div>
  );
}
