import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveMouse = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Initial setup for existing elements
    const elements = document.querySelectorAll('a, button, .project-item, .gallery-item, .skill-tag, .filter-btn, .tab, .sidebar-file');
    elements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // MutationObserver to handle dynamic elements (like tabs)
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll('a, button, .project-item, .gallery-item, .skill-tag, .filter-btn, .tab, .sidebar-file');
      newElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div 
      id="cursor" 
      ref={cursorRef}
      className={`${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="30" height="30" rx="4" fill="rgba(13, 17, 23, 0.9)" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="6" y="22" fontFamily="monospace" fontSize="14" fill="var(--accent)" fontWeight="bold">&lt;/&gt;</text>
      </svg>
    </div>
  );
}
