'use client';

import { useState, useEffect } from 'react';
import { DynamicIcon } from '@/lib/icons';

interface NewsPanelProps {
  isActive: boolean;
}

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  icon: string;
  isFeatured: boolean;
  publishedAt: string;
}

const TAG_ICON_CLASS: Record<string, string> = {
  Tourism: 'ni-a',
  Services: 'ni-b',
  Ordinance: 'ni-c',
  News: 'ni-d',
  Announcement: 'ni-a',
  Event: 'ni-b',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function NewsPanel({ isActive }: NewsPanelProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = ['All', 'News', 'Announcement', 'Event', 'Ordinance'];

  useEffect(() => {
    const params = activeFilter !== 'All' ? `?tag=${activeFilter}` : '';
    fetch(`/api/news${params}`)
      .then((r) => r.json())
      .then((data) => { setArticles(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeFilter]);

  const featured = articles.find((a) => a.isFeatured) ?? articles[0];
  const secondary = articles.filter((a) => a.id !== featured?.id).slice(0, 4);

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

        {loading ? (
          <div style={{ color: 'rgba(255,255,255,0.3)', padding: '40px 0', textAlign: 'center' }}>Loading...</div>
        ) : (
          <div className="news-panel-grid">
            {featured && (
              <div className="news-big-card">
                <div className="news-big-img"><DynamicIcon name={featured.icon} size={36} /></div>
                <div className="news-big-body">
                  <span style={{ fontSize: '10px', color: 'var(--bright)', letterSpacing: '.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    {featured.tag}
                  </span>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'white', lineHeight: 1.3, marginBottom: '8px' }}>
                    {featured.title}
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: '12px' }}>
                    {featured.excerpt}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
                    {formatDate(featured.publishedAt)}
                  </div>
                </div>
              </div>
            )}

            <div className="news-small-list">
              {secondary.map((item) => (
                <div key={item.id} className="news-small-card">
                  <div className={`nsc-icon ${TAG_ICON_CLASS[item.tag] ?? 'ni-a'}`}>
                    <DynamicIcon name={item.icon} size={18} />
                  </div>
                  <div>
                    <div className="nsc-title">{item.title}</div>
                    <div className="nsc-meta">
                      <span className="nsc-tag">{item.tag}</span>
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
