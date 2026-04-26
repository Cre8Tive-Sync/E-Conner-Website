'use client';

import { useState, useEffect, useRef } from 'react';

interface TransparencyPanelProps {
  isActive: boolean;
}

interface TransparencyDocument {
  id: number;
  name: string;
  description: string;
  icon: string;
  year: string;
  fileUrl: string;
}

export default function TransparencyPanel({ isActive }: TransparencyPanelProps) {
  const [activeYear, setActiveYear] = useState('All Years');
  const [documents, setDocuments] = useState<TransparencyDocument[]>([]);
  const complianceRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  const years = ['All Years', '2026', '2025', '2024', '2023'];

  useEffect(() => {
    const params = activeYear !== 'All Years' ? `?year=${activeYear}` : '';
    fetch(`/api/documents${params}`)
      .then((r) => r.json())
      .then(setDocuments)
      .catch(() => {});
  }, [activeYear]);

  useEffect(() => {
    if (isActive && complianceRef.current && !animatedRef.current) {
      animatedRef.current = true;
      const target = 100;
      const dur = 1400;
      const start = performance.now();

      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        if (complianceRef.current) {
          complianceRef.current.textContent = Math.floor(e * target).toString();
        }
        if (p < 1) {
          requestAnimationFrame(tick);
        } else if (complianceRef.current) {
          complianceRef.current.textContent = target.toString();
        }
      };

      requestAnimationFrame(tick);
    }
  }, [isActive]);

  return (
    <div className={`panel ${isActive ? 'active' : ''}`}>
      <div className="p-inner">
        <div className="p-header">
          <div className="p-eyebrow">Open Government · NBC 542</div>
          <div className="p-title">Transparency <em>Portal</em></div>
        </div>

        <div className="year-filter">
          {years.map((year) => (
            <button
              key={year}
              className={`yr-btn ${activeYear === year ? 'active' : ''}`}
              onClick={() => setActiveYear(year)}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="trans-layout">
          <div className="trans-doc-list">
            {documents.map((doc) => (
              <div key={doc.id} className="trans-doc">
                <span className="trans-doc-icon">{doc.icon}</span>
                <div>
                  <div className="trans-doc-name">{doc.name}</div>
                  <div className="trans-doc-sub">{doc.description}</div>
                </div>
                <span className="trans-doc-year">{doc.year}</span>
                {doc.fileUrl ? (
                  <a href={doc.fileUrl} className="trans-doc-dl" download>↓ Download PDF</a>
                ) : (
                  <span className="trans-doc-dl" style={{ opacity: 0.35, cursor: 'default' }}>↓ Download PDF</span>
                )}
              </div>
            ))}
          </div>

          <div className="trans-side">
            <div className="compliance-card">
              <div ref={complianceRef} className="compliance-num">0</div>
              <div className="compliance-label">% NBC 542 Compliance</div>
              <div className="compliance-quote">
                &quot;A government that is transparent is a government that the people can trust.&quot;
              </div>
            </div>

            <div className="nbc-badge">
              <strong>NBC 542 Compliant</strong> — All required transparency documents are published in compliance with National Budget Circular 542 requirements for LGUs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
