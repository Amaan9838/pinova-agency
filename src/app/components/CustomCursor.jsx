'use client'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import styled from '@emotion/styled'
import gsap from 'gsap'

const CursorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  pointer-events: none;
  z-index: 9999;
`

const BigBall = styled.div`
  position: fixed;
  pointer-events: none;
  mix-blend-mode: difference;
  z-index: 1000;
  
  svg circle {
    fill: #f7f8fa;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const SmallBall = styled.div`
  position: fixed;
  pointer-events: none;
  mix-blend-mode: difference;
  z-index: 1000;
  
  svg circle {
    fill: #f7f8fa;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export default function CustomCursor() {
  const isMobile = useScreenSize();
  const bigBallRef = useRef(null);
  const smallBallRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e) => {
      gsap.to(bigBallRef.current, {
        duration: 0.4,
        x: e.clientX - 15,  // Changed from pageX to clientX
        y: e.clientY - 15
      });
      
      gsap.to(smallBallRef.current, {
        duration: 0.1,
        x: e.clientX - 5,   // Changed from pageX to clientX
        y: e.clientY - 7
      });
    };

    const onMouseLeave = () => {
      gsap.to(bigBallRef.current, {
        duration: 0.1,
        opacity: 0
      });
      gsap.to(smallBallRef.current, {
        duration: 0.1,
        opacity: 0
      });
    };

    const onMouseEnter = () => {
      gsap.to(bigBallRef.current, {
        duration: 0.1,
        opacity: 1
      });
      gsap.to(smallBallRef.current, {
        duration: 0.1,
        opacity: 1
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
}, [isMobile]);


  useEffect(() => {
    if (isMobile) return;

    const handleMouseEnter = () => {
      gsap.to(bigBallRef.current, {
        duration: 0.3,
        scale: 4
      });
    };

    const handleMouseLeave = () => {
      gsap.to(bigBallRef.current, {
        duration: 0.3,
        scale: 1
      });
    };

    const hoverables = document.querySelectorAll('button, a, input, [data-hover]');
    
    hoverables.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      hoverables.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isMobile]);

  return (
    <CursorWrapper>
      <BigBall ref={bigBallRef}>
        <svg height="60" width="60">
          <circle cx="15" cy="15" r="12" strokeWidth="0"></circle>
        </svg>
      </BigBall>
      
      <SmallBall ref={smallBallRef}>
        <svg height="30" width="30">
          <circle cx="5" cy="5" r="4" strokeWidth="0"></circle>
        </svg>
      </SmallBall>
    </CursorWrapper>
  );
}

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
