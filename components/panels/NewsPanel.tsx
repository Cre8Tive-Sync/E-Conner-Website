'use client';

import { useState } from 'react';

interface NewsPanelProps {
  isActive: boolean;
}

export default function NewsPanel({ isActive }: NewsPanelProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'News', 'Announcement', 'Event', 'Ordinance'];
  
  const smallNews = [
    { icon: '🌿', iconClass: 'ni-a', title: 'Conner Joins Apayao Biosphere Reserve Initiative', tag: 'Tourism', date: 'Mar 10, 2026' },
    { icon: '📋', iconClass: 'ni-b', title: 'New Business Permit Forms Now Available Online', tag: 'Services', date: 'Mar 5, 2026' },
    { icon: '⚖️', iconClass: 'ni-c', title: 'SB Enacts Ordinance No. 2026-003 on Waste Management', tag: 'Ordinance', date: 'Feb 28, 2026' },
    { icon: '🏥', iconClass: 'ni-d', title: 'Apayao General Hospital Renamed and Expanded', tag: 'News', date: 'Feb 20, 2026' },
  ];

  return (
    <div className={`panel ${isActive ? 'active' : ''}`}>
      <div className="p-inner">
        <div className="p-header">
          <div className="p-eyebrow">Latest Updates</div>
          <div className="p-title">News & <em>Announcements</em></div>
        </div>
        
        <div className="news-cat-filters">
          {filters.map((filter) => (
            <button 
              key={filter} 
              className={`cat-filter ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="news-panel-grid">
          <div className="news-big-card">
            <div className="news-big-img">📊</div>
            <div className="news-big-body">
              <span style={{ fontSize: '10px', color: 'var(--bright)', letterSpacing: '.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Announcement
              </span>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'white', lineHeight: 1.3, marginBottom: '8px' }}>
                Municipal Budget Transparency Report Now Available for Public Review
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: '12px' }}>
                The municipality of Conner is pleased to announce that the full budget transparency report for fiscal year 2025 is now available for public viewing.
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
                March 15, 2026 · Mayor&apos;s Office
              </div>
            </div>
          </div>
          
          <div className="news-small-list">
            {smallNews.map((item, index) => (
              <div key={index} className="news-small-card">
                <div className={`nsc-icon ${item.iconClass}`}>{item.icon}</div>
                <div>
                  <div className="nsc-title">{item.title}</div>
                  <div className="nsc-meta">
                    <span className="nsc-tag">{item.tag}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
