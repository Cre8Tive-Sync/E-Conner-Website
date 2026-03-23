'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isBig, setIsBig] = useState(false);
  
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let animationId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px';
        cursorRef.current.style.top = my + 'px';
      }
    };
    
    const animRing = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      animationId = requestAnimationFrame(animRing);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animRing);
    
    // Add hover handlers for interactive elements
    const hoverSelectors = '.rail-btn,.quick-item,.news-item,.svc-card,.trans-doc,.form-item,.news-small-card,.news-big-card,.spot-card,.stat-tile,.official-card,.bgy-item,.contact-tile,.culture-card,.cat-filter,.yr-btn,.form-btn';
    
    const handleMouseEnter = () => setIsBig(true);
    const handleMouseLeave = () => setIsBig(false);
    
    const setupHoverHandlers = () => {
      document.querySelectorAll(hoverSelectors).forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };
    
    // Initial setup
    setupHoverHandlers();
    
    // Setup observer for dynamic elements
    const observer = new MutationObserver(() => {
      setupHoverHandlers();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      observer.disconnect();
      document.querySelectorAll(hoverSelectors).forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  return (
    <>
      <div ref={cursorRef} className={`cursor ${isBig ? 'big' : ''}`}></div>
      <div ref={ringRef} className={`cursor-ring ${isBig ? 'big' : ''}`}></div>
    </>
  );
}
