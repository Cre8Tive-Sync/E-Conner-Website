'use client';

import { useEffect, useRef, useState } from 'react';
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

interface NewsItem {
  id: number;
  title: string;
  tag: string;
  icon: string;
  publishedAt: string;
}

interface Announcement {
  id: number;
  text: string;
}

const THUMB_CLASSES = ['nt-1', 'nt-2', 'nt-3', 'nt-4'];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
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

const quickItems = [
  { icon: '📋', name: 'Downloadable Forms', sub: 'Permits, clearances & registrations', page: 'services' as NavPage },
  { icon: '🔍', name: 'Transparency Portal', sub: 'Budgets, ordinances, COA reports', page: 'transparency' as NavPage },
  { icon: '🏛', name: 'Municipal Officials', sub: 'Mayor, Vice Mayor, Councilors', page: 'profile' as NavPage },
  { icon: '🌿', name: 'Tourism', sub: 'Destinations & Isnag heritage', page: 'tourism' as NavPage },
  { icon: '✉️', name: 'Contact & Feedback', sub: 'Send us your concerns', page: 'contact' as NavPage },
];

export default function HomePanel({ isActive, onNavigate }: HomePanelProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [marqueeItems, setMarqueeItems] = useState<string[]>([
    'Welcome to the official website of the Municipality of Conner, Apayao',
    'Home of the Isnag people · Cordillera Administrative Region',
    'Downloadable government forms now available online',
    'For inquiries contact the Municipal Hall · Caglayan, Conner, Apayao',
  ]);

  useEffect(() => {
    fetch('/api/news')
      .then((r) => r.json())
      .then((data: NewsItem[]) => setNewsItems(data.slice(0, 4)))
      .catch(() => {});

    fetch('/api/announcements')
      .then((r) => r.json())
      .then((data: Announcement[]) => {
        if (data.length > 0) setMarqueeItems(data.map((a) => a.text));
      })
      .catch(() => {});
  }, []);

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
              <div key={item.id} className="news-item">
                <div className={`news-item-thumb ${THUMB_CLASSES[index % THUMB_CLASSES.length]}`}>{item.icon}</div>
                <div>
                  <div className="news-item-tag">{item.tag}</div>
                  <div className="news-item-title">{item.title}</div>
                  <div className="news-item-date">{formatDate(item.publishedAt)}</div>
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
