'use client';

interface ServicesPanelProps {
  isActive: boolean;
}

export default function ServicesPanel({ isActive }: ServicesPanelProps) {
  const services = [
    { icon: '📋', name: 'Downloadable Forms', desc: 'Access official government forms for permits, clearances, and registrations from any device.' },
    { icon: '🏢', name: 'Business Permits', desc: 'Requirements, fees, and step-by-step guide for obtaining or renewing your business permit.' },
    { icon: '📜', name: 'Civil Registry', desc: 'Birth certificates, marriage licenses, death certificates and civil registration documents.' },
    { icon: '🏠', name: 'Barangay Services', desc: 'Barangay clearance, indigency certificates, and community-level service requests.' },
    { icon: '🌱', name: 'Agriculture Office', desc: 'Farming assistance, crop insurance, and agricultural support programs for Conner farmers.' },
    { icon: '🛠️', name: 'Engineering Office', desc: 'Building permits, infrastructure requests, and engineering certifications.' },
  ];

  const forms = [
    { name: 'Business Permit Application', office: "Mayor's Office" },
    { name: 'Barangay Clearance Request', office: 'Barangay Affairs' },
    { name: 'Indigency Certificate', office: 'Social Welfare Office' },
    { name: 'Building Permit Application', office: 'Municipal Engineer' },
    { name: 'Local Employment Form', office: 'PESO Office' },
    { name: 'FOI Request Form', office: "Mayor's Office" },
  ];

  return (
    <div className={`panel ${isActive ? 'active' : ''}`}>
      <div className="p-inner">
        <div className="p-header">
          <div className="p-eyebrow">Government Services</div>
          <div className="p-title">Online <em>Services</em></div>
        </div>
        
        <div className="services-grid-panel">
          {services.map((service, index) => (
            <div key={index} className="svc-card">
              <span className="svc-icon">{service.icon}</span>
              <div className="svc-name">{service.name}</div>
              <div className="svc-desc">{service.desc}</div>
              <div className="svc-link">Access Forms →</div>
            </div>
          ))}
        </div>
        
        <div className="p-eyebrow" style={{ marginBottom: '14px' }}>Frequently Downloaded</div>
        
        <div className="forms-grid">
          {forms.map((form, index) => (
            <div key={index} className="form-item">
              <span style={{ fontSize: '18px' }}>📄</span>
              <div>
                <div className="form-name">{form.name}</div>
                <div className="form-office">{form.office}</div>
              </div>
              <span className="form-dl">↓ PDF</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
