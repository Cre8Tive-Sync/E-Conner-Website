'use client';

interface ContactPanelProps {
  isActive: boolean;
  onSendMessage: () => void;
}

export default function ContactPanel({ isActive, onSendMessage }: ContactPanelProps) {
  const departments = [
    "Mayor's Office",
    'Civil Registrar',
    'Municipal Assessor',
    'Tourism Office',
    'Municipal Engineer',
    'General Inquiry',
  ];

  return (
    <div className={`panel ${isActive ? 'active' : ''}`}>
      <div className="p-inner">
        <div className="p-header">
          <div className="p-eyebrow">Get In Touch</div>
          <div className="p-title">Contact & <em>Feedback</em></div>
        </div>
        
        <div className="contact-layout">
          <div className="contact-form-wrap">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" placeholder="Juan dela Cruz" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" placeholder="juan@example.com" />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Department</label>
              <select className="form-select" defaultValue="">
                <option value="">Select a department</option>
                {departments.map((dept) => (
                  <option key={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input type="text" className="form-input" placeholder="Brief subject of your message" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" placeholder="Type your message here..."></textarea>
            </div>
            
            <button className="form-btn" onClick={onSendMessage}>
              Send Message →
            </button>
          </div>
          
          <div className="contact-info-wrap">
            <div className="contact-tile">
              <span className="ct-icon">📍</span>
              <div>
                <div className="ct-label">Address</div>
                <div className="ct-value">Municipal Hall, Caglayan<br />Conner, Apayao, Philippines</div>
              </div>
            </div>
            
            <div className="contact-tile">
              <span className="ct-icon">📞</span>
              <div>
                <div className="ct-label">Tourism Office</div>
                <div className="ct-value">+63 960 429 4262</div>
              </div>
            </div>
            
            <div className="contact-tile">
              <span className="ct-icon">✉️</span>
              <div>
                <div className="ct-label">Tourism Email</div>
                <div className="ct-value">connerapayaotourism@gmail.com</div>
              </div>
            </div>
            
            <div className="contact-tile">
              <span className="ct-icon">🕐</span>
              <div>
                <div className="ct-label">Office Hours</div>
                <div className="ct-value">Monday – Friday<br />8:00 AM – 5:00 PM</div>
              </div>
            </div>
            
            <div className="map-block">
              <div className="map-pin">📍</div>
              <div className="map-label">Conner, Apayao · CAR, Philippines</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
