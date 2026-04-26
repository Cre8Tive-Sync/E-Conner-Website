'use client';

import { Home, Landmark, Newspaper, ClipboardList, Eye, Leaf, Mail } from 'lucide-react';
import { NavPage } from '@/lib/types';

interface RailProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  time: string;
}

const navItems: { id: NavPage; icon: JSX.Element; tip: string }[] = [
  { id: 'home', icon: <Home size={18} />, tip: 'Home' },
  { id: 'profile', icon: <Landmark size={18} />, tip: 'Municipal Profile' },
  { id: 'news', icon: <Newspaper size={18} />, tip: 'News & Announcements' },
  { id: 'services', icon: <ClipboardList size={18} />, tip: 'Online Services' },
  { id: 'transparency', icon: <Eye size={18} />, tip: 'Transparency' },
  { id: 'tourism', icon: <Leaf size={18} />, tip: 'Tourism' },
];

export default function Rail({ currentPage, onNavigate, time }: RailProps) {
  return (
    <div className="rail">
      <div className="rail-logo" onClick={() => onNavigate('home')}><Leaf size={22} /></div>
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
        <Mail size={18} /><span className="tip">Contact & Feedback</span>
      </div>

      <div className="rail-pst">{time}</div>
    </div>
  );
}
