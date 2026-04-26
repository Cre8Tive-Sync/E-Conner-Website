'use client';

import { CheckCircle } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
}

export default function Toast({ isVisible }: ToastProps) {
  return (
    <div className={`toast ${isVisible ? 'show' : ''}`}>
      <CheckCircle size={18} />
      <span className="toast-text">Message sent! We&apos;ll get back to you within 3 business days.</span>
    </div>
  );
}
