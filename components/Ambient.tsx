'use client';

import { useEffect, useRef } from 'react';

export default function Ambient() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
      }
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.4}px)`;
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="ambient">
      <div ref={orb1Ref} className="orb orb-1"></div>
      <div ref={orb2Ref} className="orb orb-2"></div>
      <div ref={orb3Ref} className="orb orb-3"></div>
    </div>
  );
}
