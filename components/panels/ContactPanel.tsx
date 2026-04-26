'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactPanelProps {
  isActive: boolean;
  onSendMessage: () => void;
}

const departments = [
  "Mayor's Office",
  'Civil Registrar',
  'Municipal Assessor',
  'Tourism Office',
  'Municipal Engineer',
  'General Inquiry',
];

export default function ContactPanel({ isActive, onSendMessage }: ContactPanelProps) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    department: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { fullName, email, department, subject, message } = form;
    if (!fullName || !email || !department || !subject || !message) {
      setError('Please fill in all fields before sending.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error');
      setForm({ fullName: '', email: '', department: '', subject: '', message: '' });
      onSendMessage();
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`panel ${isActive ? 'active' : ''}`}>
      <div className="p-inner">
        <div className="p-header">
          <div className="p-eyebrow">Get In Touch</div>
          <div className="p-title">Contact & <em>Feedback</em></div>
        </div>

        <div className="contact-layout">
          <form className="contact-form-wrap" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  placeholder="Juan dela Cruz"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="juan@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <select
                name="department"
                className="form-select"
                value={form.department}
                onChange={handleChange}
              >
                <option value="">Select a department</option>
                {departments.map((dept) => (
                  <option key={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                className="form-input"
                placeholder="Brief subject of your message"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-textarea"
                placeholder="Type your message here..."
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {error && (
              <div style={{ fontSize: '13px', color: '#f87171', marginBottom: '12px' }}>{error}</div>
            )}

            <button className="form-btn" type="submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message →'}
            </button>
          </form>

          <div className="contact-info-wrap">
            <div className="contact-tile">
              <span className="ct-icon"><MapPin size={20} /></span>
              <div>
                <div className="ct-label">Address</div>
                <div className="ct-value">Municipal Hall, Caglayan<br />Conner, Apayao, Philippines</div>
              </div>
            </div>

            <div className="contact-tile">
              <span className="ct-icon"><Phone size={20} /></span>
              <div>
                <div className="ct-label">Tourism Office</div>
                <div className="ct-value">+63 960 429 4262</div>
              </div>
            </div>

            <div className="contact-tile">
              <span className="ct-icon"><Mail size={20} /></span>
              <div>
                <div className="ct-label">Tourism Email</div>
                <div className="ct-value">connerapayaotourism@gmail.com</div>
              </div>
            </div>

            <div className="contact-tile">
              <span className="ct-icon"><Clock size={20} /></span>
              <div>
                <div className="ct-label">Office Hours</div>
                <div className="ct-value">Monday – Friday<br />8:00 AM – 5:00 PM</div>
              </div>
            </div>

            <div className="map-block">
              <div className="map-pin"><MapPin size={24} /></div>
              <div className="map-label">Conner, Apayao · CAR, Philippines</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
