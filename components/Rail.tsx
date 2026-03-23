'use client';

import { NavPage } from '@/lib/types';

interface RailProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  time: string;
}

const navItems: { id: NavPage; icon: string; tip: string }[] = [
  { id: 'home', icon: '⌂', tip: 'Home' },
  { id: 'profile', icon: '🏛', tip: 'Municipal Profile' },
  { id: 'news', icon: '📰', tip: 'News & Announcements' },
  { id: 'services', icon: '📋', tip: 'Online Services' },
  { id: 'transparency', icon: '🔍', tip: 'Transparency' },
  { id: 'tourism', icon: '🌿', tip: 'Tourism' },
];

export default function Rail({ currentPage, onNavigate, time }: RailProps) {
  return (
    <div className="rail">
      <div className="rail-logo" onClick={() => onNavigate('home')}>🌿</div>
      <div className="rail-divider"></div>
      
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`rail-btn ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          {item.icon}
          <span className="tip">{item.tip}</span>
        </div>
      ))}
      
      <div className="rail-spacer"></div>
      <div className="rail-divider"></div>
      
      <div
        className={`rail-btn ${currentPage === 'contact' ? 'active' : ''}`}
        onClick={() => onNavigate('contact')}
      >
        ✉<span className="tip">Contact & Feedback</span>
      </div>
      
      <div className="rail-pst">{time}</div>
    </div>
  );
}
