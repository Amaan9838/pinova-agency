'use client'

import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import styled from '@emotion/styled'

const CursorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  pointer-events: none;
  z-index: 9999;
`

const Cursor = styled.div`
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: difference;
  background-color: black;
  will-change: transform, width, height;
  transform: translate(-50%, -50%);
  transition: width 0.2s cubic-bezier(0.23, 1, 0.32, 1),
              height 0.2s cubic-bezier(0.23, 1, 0.32, 1);

  @media (max-width: 768px) {
    display: none;
  }
`

const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export default function CustomCursor() {
  const isMobile = useScreenSize();
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const cursorSize = isHovered ? 64 : 32;
  const scale = isClicked ? 0.9 : 1;

  useEffect(() => {
    if (isMobile) return;

    let rafId;
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      if (!cursor) return;
      
      rafId = requestAnimationFrame(() => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${scale})`;
      });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile, scale]);

  useEffect(() => {
    if (isMobile) return;

    const interactiveElements = document.querySelectorAll('button, a, input, [data-hover]');
    
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isMobile]);

  return (
    <CursorWrapper className='z-10'>
      <Cursor
        ref={cursorRef}
        style={{
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          mixBlendMode: 'difference'
        }}
      />
    </CursorWrapper>
  );
}
