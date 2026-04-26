'use client';

import { Leaf } from 'lucide-react';

interface PreloaderProps {
  isVisible: boolean;
}

export default function Preloader({ isVisible }: PreloaderProps) {
  return (
    <div className={`preloader ${!isVisible ? 'out' : ''}`} style={{ display: isVisible ? undefined : 'none' }}>
      <div className="pre-ring"><Leaf size={32} /></div>
      <p className="pre-text">Municipality of Conner</p>
    </div>
  );
}
