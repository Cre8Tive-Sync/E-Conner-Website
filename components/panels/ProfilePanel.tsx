'use client';

import { useState, useEffect } from 'react';
import { User } from 'lucide-react';

interface ProfilePanelProps {
  isActive: boolean;
}

interface Official {
  id: number;
  name: string;
  position: string;
  badge: string | null;
}

const barangays = [
  'Balugbo', 'Bulu', 'Caglayan', 'Daga', 'Dibuluan', 'Dipusu', 'Duplicasan',
  'Eleazar', 'Emiliana', 'Imelda', 'Lucab', 'Luna Norte', 'Luna Sur', 'Malama',
  'Manag', 'Nabuangan', 'Paddaya', 'Poblacion', 'Quirino', 'Salvacion', 'Santa Filomena',
];

export default function ProfilePanel({ isActive }: ProfilePanelProps) {
  const [officials, setOfficials] = useState<Official[]>([]);

  useEffect(() => {
    fetch('/api/officials')
      .then((r) => r.json())
      .then(setOfficials)
      .catch(() => {});
  }, []);

  return (
    <div className={`panel ${isActive ? 'active' : ''}`}>
      <div className="p-inner">
        <div className="p-header">
          <div className="p-eyebrow">Municipal Profile</div>
          <div className="p-title">About <em>Conner</em></div>
        </div>

        <div className="profile-layout">
          <div className="glass-card">
            <div className="card-label">History</div>
            <div className="card-title">Named after an American Engineer</div>
            <div className="card-body">
              Conner is a 2nd-class municipality in the province of Apayao, Cordillera Administrative Region.
              It was named after Norman Conner, an American engineer who oversaw the construction of the main
              roads that effectively ended the isolation of Apayao from the outside world during the early American era.
            </div>
          </div>

          <div className="glass-card">
            <div className="card-label">Vision &amp; Mission</div>
            <div className="card-title">Our Commitment</div>
            <div className="vm-text">
              &quot;A progressive, self-reliant, and empowered Municipality of Conner with God-fearing,
              peace-loving, and law-abiding citizens.&quot;
            </div>
          </div>

          <div className="glass-card full">
            <div className="card-label">Elected Officials</div>
            <div className="card-title">Leadership</div>
            <div className="officials-grid">
              {officials.map((official) => (
                <div key={official.id} className="official-card">
                  <div className="official-avatar"><User size={28} /></div>
                  <div className="official-name">{official.name}</div>
                  <div className="official-pos">{official.position}</div>
                  {official.badge && <div className="vm-badge">{official.badge}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card full">
            <div className="card-label">Barangay Directory</div>
            <div className="card-title">21 Barangays</div>
            <div className="barangay-list">
              {barangays.map((barangay, index) => (
                <div key={index} className="bgy-item">
                  <div className="bgy-dot"></div>
                  {barangay}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
