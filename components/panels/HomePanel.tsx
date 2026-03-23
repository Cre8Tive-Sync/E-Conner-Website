'use client';

import { useEffect, useRef } from 'react';
import { NavPage } from '@/lib/types';

interface HomePanelProps {
  isActive: boolean;
  onNavigate: (page: NavPage) => void;
}

interface StatTileProps {
  count: number;
  label: string;
  isActive: boolean;
}

function StatTile({ count, label, isActive }: StatTileProps) {
  const numRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);
  
  useEffect(() => {
    if (isActive && numRef.current && !animatedRef.current) {
      animatedRef.current = true;
      const target = count;
      const dur = 1400;
      const start = performance.now();
      
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        if (numRef.current) {
          numRef.current.textContent = Math.floor(e * target).toLocaleString();
        }
        if (p < 1) {
          requestAnimationFrame(tick);
        } else if (numRef.current) {
          numRef.current.textContent = target.toLocaleString();
        }
      };
      
      requestAnimationFrame(tick);
    }
  }, [isActive, count]);
  
  return (
    <div className="stat-tile">
      <div className="stat-tile-accent"></div>
      <div ref={numRef} className="stat-tile-num">0</div>
      <div className="stat-tile-label">{label}</div>
    </div>
  );
}

export default function HomePanel({ isActive, onNavigate }: HomePanelProps) {
  const marqueeItems = [
    'Welcome to the official website of the Municipality of Conner, Apayao',
    'Home of the Isnag people · Cordillera Administrative Region',
    'Downloadable government forms now available online',
    'For inquiries contact the Municipal Hall · Caglayan, Conner, Apayao',
  ];

  const newsItems = [
    { icon: '📊', tag: 'Announcement', title: 'Municipal Budget Transparency Report Now Available for Public Review', date: 'March 15, 2026', thumbClass: 'nt-1' },
    { icon: '🌿', tag: 'Tourism', title: 'Conner Joins Apayao Biosphere Reserve Initiative', date: 'March 10, 2026', thumbClass: 'nt-2' },
    { icon: '📋', tag: 'Services', title: 'New Business Permit Forms Now Available Online', date: 'March 5, 2026', thumbClass: 'nt-3' },
    { icon: '⚖️', tag: 'Ordinance', title: 'SB Enacts Ordinance No. 2026-003 on Waste Management', date: 'Feb 28, 2026', thumbClass: 'nt-4' },
  ];

  const quickItems = [
    { icon: '📋', name: 'Downloadable Forms', sub: 'Permits, clearances & registrations', page: 'services' as NavPage },
    { icon: '🔍', name: 'Transparency Portal', sub: 'Budgets, ordinances, COA reports', page: 'transparency' as NavPage },
    { icon: '🏛', name: 'Municipal Officials', sub: 'Mayor, Vice Mayor, Councilors', page: 'profile' as NavPage },
    { icon: '🌿', name: 'Tourism', sub: 'Destinations & Isnag heritage', page: 'tourism' as NavPage },
    { icon: '✉️', name: 'Contact & Feedback', sub: 'Send us your concerns', page: 'contact' as NavPage },
  ];

  return (
    <div className={`panel ${isActive ? 'active' : ''}`}>
      <div className="p-inner">
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="m-item">
                <span className="m-dot"></span>
                {item}
              </span>
            ))}
          </div>
        </div>
        
        <div className="home-hero">
          <div className="home-hero-main">
            <div className="home-hero-eyebrow">Province of Apayao · CAR</div>
            <div className="home-hero-title">Municipality<br />of <em>Conner</em></div>
            <div className="home-hero-sub">Official Government Information Portal</div>
          </div>
          <div className="home-hero-side">
            <StatTile count={28360} label="Population (2024)" isActive={isActive} />
            <StatTile count={21} label="Barangays" isActive={isActive} />
            <StatTile count={694} label="km² Land Area" isActive={isActive} />
          </div>
        </div>
        
        <div className="home-grid">
          <div>
            <div className="home-news-title">
              Latest Updates{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('news'); }}>
                View all →
              </a>
            </div>
            {newsItems.map((item, index) => (
              <div key={index} className="news-item">
                <div className={`news-item-thumb ${item.thumbClass}`}>{item.icon}</div>
                <div>
                  <div className="news-item-tag">{item.tag}</div>
                  <div className="news-item-title">{item.title}</div>
                  <div className="news-item-date">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="home-quick">
            {quickItems.map((item, index) => (
              <div key={index} className="quick-item" onClick={() => onNavigate(item.page)}>
                <span className="quick-icon">{item.icon}</span>
                <div>
                  <div className="quick-name">{item.name}</div>
                  <div className="quick-sub">{item.sub}</div>
                </div>
                <span className="quick-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
