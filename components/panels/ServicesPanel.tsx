'use client';

import { useState, useEffect } from 'react';
import { ClipboardList, Building2, Scroll, Home, Sprout, Wrench, FileText, type LucideIcon } from 'lucide-react';

interface ServicesPanelProps {
  isActive: boolean;
}

interface ServiceForm {
  id: number;
  name: string;
  office: string;
  fileUrl: string;
}

const services: { icon: LucideIcon; name: string; desc: string }[] = [
  { icon: ClipboardList, name: 'Downloadable Forms', desc: 'Access official government forms for permits, clearances, and registrations from any device.' },
  { icon: Building2, name: 'Business Permits', desc: 'Requirements, fees, and step-by-step guide for obtaining or renewing your business permit.' },
  { icon: Scroll, name: 'Civil Registry', desc: 'Birth certificates, marriage licenses, death certificates and civil registration documents.' },
  { icon: Home, name: 'Barangay Services', desc: 'Barangay clearance, indigency certificates, and community-level service requests.' },
  { icon: Sprout, name: 'Agriculture Office', desc: 'Farming assistance, crop insurance, and agricultural support programs for Conner farmers.' },
  { icon: Wrench, name: 'Engineering Office', desc: 'Building permits, infrastructure requests, and engineering certifications.' },
];

export default function ServicesPanel({ isActive }: ServicesPanelProps) {
  const [forms, setForms] = useState<ServiceForm[]>([]);

  useEffect(() => {
    fetch('/api/forms')
      .then((r) => r.json())
      .then(setForms)
      .catch(() => {});
  }, []);

  return (
    <div className={`panel ${isActive ? 'active' : ''}`}>
      <div className="p-inner">
        <div className="p-header">
          <div className="p-eyebrow">Government Services</div>
          <div className="p-title">Online <em>Services</em></div>
        </div>

        <div className="services-grid-panel">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="svc-card">
                <span className="svc-icon"><Icon size={20} /></span>
                <div className="svc-name">{service.name}</div>
                <div className="svc-desc">{service.desc}</div>
                <div className="svc-link">Access Forms →</div>
              </div>
            );
          })}
        </div>

        <div className="p-eyebrow" style={{ marginBottom: '14px' }}>Frequently Downloaded</div>

        <div className="forms-grid">
          {forms.map((form) => (
            <div key={form.id} className="form-item">
              <FileText size={18} />
              <div>
                <div className="form-name">{form.name}</div>
                <div className="form-office">{form.office}</div>
              </div>
              {form.fileUrl ? (
                <a href={form.fileUrl} className="form-dl" download>↓ PDF</a>
              ) : (
                <span className="form-dl" style={{ opacity: 0.35, cursor: 'default' }}>↓ PDF</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
