'use client';

interface TourismPanelProps {
  isActive: boolean;
}

export default function TourismPanel({ isActive }: TourismPanelProps) {
  const spots = [
    { icon: '🏔️', name: 'Apayao-Abulug River', desc: 'A majestic river flowing through Conner, part of the UNESCO-listed Apayao Biosphere Reserve.', imgClass: 'sp-1' },
    { icon: '💧', name: 'Natural Springs', desc: 'Cool, clear springs nestled in the mountains of Conner, accessible via scenic forest trails.', imgClass: 'sp-2' },
    { icon: '🌳', name: 'Dipterocarp Forest', desc: 'Home to lawaan trees, Rafflesia flowers, and critically endangered wildlife of the Cordillera.', imgClass: 'sp-3' },
  ];

  return (
    <div className={`panel ${isActive ? 'active' : ''}`}>
      <div className="p-inner">
        <div className="tourism-hero-banner">
          <div>
            <div className="tourism-banner-title">Discover<br /><em>Conner</em></div>
            <div className="tourism-banner-sub">Nature · Culture · Heritage</div>
          </div>
        </div>
        
        <div className="tourism-spots-grid">
          {spots.map((spot, index) => (
            <div key={index} className="spot-card">
              <div className={`spot-img ${spot.imgClass}`}>{spot.icon}</div>
              <div className="spot-body">
                <div className="spot-name">{spot.name}</div>
                <div className="spot-desc">{spot.desc}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="isnag-section">
          <div className="culture-card">
            <div className="culture-card-label">Indigenous Heritage</div>
            <div className="culture-card-title">The Isnag People</div>
            <div className="culture-card-body">
              The Isnag are the indigenous people of Apayao. In Conner, the Nabwangan dialect is spoken. 
              Their rich oral traditions, weaving arts, and ancestral practices are preserved across the 
              municipality&apos;s upland communities.
            </div>
          </div>
          
          <div className="culture-card">
            <div className="culture-card-label">Tourism Contact</div>
            <div className="culture-card-title">Plan Your Visit</div>
            <div className="culture-card-body" style={{ marginBottom: '16px' }}>
              Our tourism office is ready to assist visitors in exploring the best of Conner.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', display: 'flex', gap: '10px' }}>
                <span>📞</span><span>+63 960 429 4262</span>
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', display: 'flex', gap: '10px' }}>
                <span>✉️</span><span>connerapayaotourism@gmail.com</span>
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', display: 'flex', gap: '10px' }}>
                <span>📘</span><span>@tourismofconner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
