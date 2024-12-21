'use client'

import { useState, useEffect, useLayoutEffect } from 'react'
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
  transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    display: none;
  }
`

const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => {
      const width = document.documentElement.clientWidth;
      setIsMobile(width <= 768);
    };
    checkMobile();
    const resizeObserver = new ResizeObserver(checkMobile);
    resizeObserver.observe(document.documentElement);
    return () => resizeObserver.disconnect();
  }, []);

  return isMobile;
};

export default function CustomCursor() {
  const isMobile = useScreenSize();
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile]);


  useEffect(() => {
    if (isMobile) return;
    const handleHoverElements = () => {
      const interactiveElements = document.querySelectorAll('button, a, input, [data-hover]')
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => setIsHovered(true))
        element.addEventListener('mouseleave', () => setIsHovered(false))
      })
    }

    handleHoverElements()
  }, [isMobile])

  const cursorSize = isHovered ? 64 : 32
  const scale = isClicked ? 0.9 : 1

  return (
    <>
      <CursorWrapper>
        <Cursor
          style={{
            width: `${cursorSize}px`,
            height: `${cursorSize}px`,
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            left: 0,
            top: 0,
            mixBlendMode: 'difference' // Add this line
          }}
        />
      </CursorWrapper>

    
    </>
  )
}
