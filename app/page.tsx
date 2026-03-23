'use client';

import { useState, useEffect, useCallback } from 'react';
import { NavPage, NavConfig } from '@/lib/types';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Ambient from '@/components/Ambient';
import Rail from '@/components/Rail';
import Topbar from '@/components/Topbar';
import Toast from '@/components/Toast';
import HomePanel from '@/components/panels/HomePanel';
import ProfilePanel from '@/components/panels/ProfilePanel';
import NewsPanel from '@/components/panels/NewsPanel';
import ServicesPanel from '@/components/panels/ServicesPanel';
import TransparencyPanel from '@/components/panels/TransparencyPanel';
import TourismPanel from '@/components/panels/TourismPanel';
import ContactPanel from '@/components/panels/ContactPanel';

const navConfig: Record<NavPage, NavConfig> = {
  home: { title: 'Municipality of Conner', sub: 'Official Website', tabs: [] },
  profile: { title: 'Municipal Profile', sub: 'Conner, Apayao', tabs: ['Overview', 'Officials', 'Barangays'] },
  news: { title: 'News & Announcements', sub: 'Latest Updates', tabs: ['All', 'News', 'Announcements', 'Events'] },
  services: { title: 'Online Services', sub: 'Government Services', tabs: ['All Services', 'Forms', 'Guides'] },
  transparency: { title: 'Transparency Portal', sub: 'NBC 542 Compliant', tabs: ['All Documents', 'Budget', 'Ordinances', 'FOI'] },
  tourism: { title: 'Tourism', sub: 'Discover Conner', tabs: ['Destinations', 'Culture', 'Contact'] },
  contact: { title: 'Contact & Feedback', sub: 'Get In Touch', tabs: [] },
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [time, setTime] = useState('--:--:--');
  const [showToast, setShowToast] = useState(false);

  // Clock ticker
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-PH', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(t);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Preloader dismiss
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = useCallback((page: NavPage) => {
    if (currentPage !== page) {
      setCurrentPage(page);
    }
  }, [currentPage]);

  const handleSendMessage = useCallback(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  }, []);

  return (
    <>
      <Preloader isVisible={isLoading} />
      <CustomCursor />
      <Ambient />
      
      <Rail 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        time={time} 
      />
      
      <div className="main">
        <Topbar 
          currentPage={currentPage} 
          navConfig={navConfig} 
          time={time} 
        />
        
        <div className="content">
          <HomePanel 
            isActive={currentPage === 'home'} 
            onNavigate={handleNavigate} 
          />
          <ProfilePanel isActive={currentPage === 'profile'} />
          <NewsPanel isActive={currentPage === 'news'} />
          <ServicesPanel isActive={currentPage === 'services'} />
          <TransparencyPanel isActive={currentPage === 'transparency'} />
          <TourismPanel isActive={currentPage === 'tourism'} />
          <ContactPanel 
            isActive={currentPage === 'contact'} 
            onSendMessage={handleSendMessage} 
          />
        </div>
      </div>
      
      <Toast isVisible={showToast} />
    </>
  );
}
