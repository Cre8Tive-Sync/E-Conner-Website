'use client';

interface ToastProps {
  isVisible: boolean;
}

export default function Toast({ isVisible }: ToastProps) {
  return (
    <div className={`toast ${isVisible ? 'show' : ''}`}>
      <span style={{ fontSize: '18px' }}>✓</span>
      <span className="toast-text">Message sent! We&apos;ll get back to you within 3 business days.</span>
    </div>
  );
}
