'use client';

import { useEffect, useMemo, useState } from 'react';
import Ambient from '@/components/Ambient';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Rail from '@/components/Rail';
import Toast from '@/components/Toast';
import Topbar from '@/components/Topbar';
import ContactPanel from '@/components/panels/ContactPanel';
import HomePanel from '@/components/panels/HomePanel';
import NewsPanel from '@/components/panels/NewsPanel';
import ProfilePanel from '@/components/panels/ProfilePanel';
import ServicesPanel from '@/components/panels/ServicesPanel';
import TourismPanel from '@/components/panels/TourismPanel';
import TransparencyPanel from '@/components/panels/TransparencyPanel';
import { NavConfig, NavPage } from '@/lib/types';

const navConfig: Record<NavPage, NavConfig> = {
  home: {
    title: 'Municipality of Conner',
    sub: 'Official Government Portal',
    tabs: ['Overview', 'Highlights', 'Quick Access'],
  },
  profile: {
    title: 'Municipal Profile',
    sub: 'History, Leadership, Barangays',
    tabs: ['History', 'Officials', 'Barangays'],
  },
  news: {
    title: 'News and Announcements',
    sub: 'Latest Public Updates',
    tabs: ['All', 'News', 'Announcements'],
  },
  services: {
    title: 'Online Services',
    sub: 'Forms and Citizen Services',
    tabs: ['Services', 'Forms', 'Downloads'],
  },
  transparency: {
    title: 'Transparency Portal',
    sub: 'Open Government Documents',
    tabs: ['Documents', 'Compliance', 'Archive'],
  },
  tourism: {
    title: 'Tourism',
    sub: 'Explore Conner',
    tabs: ['Destinations', 'Culture', 'Visit'],
  },
  contact: {
    title: 'Contact and Feedback',
    sub: 'Reach the Municipal Government',
    tabs: ['Message', 'Offices', 'Directory'],
  },
};

function getPhtTime(now: Date) {
  return now.toLocaleTimeString('en-PH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Manila',
  });
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [showPreloader, setShowPreloader] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const preloaderTimeout = setTimeout(() => setShowPreloader(false), 1200);
    return () => clearTimeout(preloaderTimeout);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = useMemo(() => getPhtTime(now), [now]);

  function handleContactSuccess() {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3200);
  }

  return (
    <>
      <Preloader isVisible={showPreloader} />
      <Ambient />
      <CustomCursor />

      <Rail currentPage={currentPage} onNavigate={setCurrentPage} time={time} />

      <main className="main">
        <Topbar currentPage={currentPage} navConfig={navConfig} time={time} />

        <div className="content">
          <HomePanel isActive={currentPage === 'home'} onNavigate={setCurrentPage} />
          <ProfilePanel isActive={currentPage === 'profile'} />
          <NewsPanel isActive={currentPage === 'news'} />
          <ServicesPanel isActive={currentPage === 'services'} />
          <TransparencyPanel isActive={currentPage === 'transparency'} />
          <TourismPanel isActive={currentPage === 'tourism'} />
          <ContactPanel isActive={currentPage === 'contact'} onSendMessage={handleContactSuccess} />
        </div>
      </main>

      <Toast isVisible={showToast} />
    </>
  );
}
