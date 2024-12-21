'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import styled from '@emotion/styled'

// Custom hook for handling screen size
const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => {
      // Using document.documentElement for more reliable width detection
      const width = document.documentElement.clientWidth || document.body.clientWidth;
      setIsMobile(width <= 768);
    };

    // Check immediately after mount
    checkMobile();

    // Setup resize observer for more reliable detection
    const resizeObserver = new ResizeObserver(() => {
      checkMobile();
    });

    resizeObserver.observe(document.documentElement);

    // Cleanup
    return () => resizeObserver.disconnect();
  }, []);

  return isMobile;
};

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: white;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 100vh;
    height: auto;
    padding: 2rem 0;
  }
`

const HeroText = styled.div`
  h1 {
    font-size: clamp(3rem, 8vw, 7rem);
    line-height: 1.2;
    margin: 0;
    font-weight: 700;
    font-family: var(--font-baloo2);
    color: #000;
    text-align: center;
    transition: font-size 0.3s ease;
    
    @media (max-width: 768px) {
      font-size: clamp(2.5rem, 6vw, 4rem);
      line-height: 1.3;
    }

    @media (max-width: 480px) {
      font-size: clamp(2rem, 5vw, 3rem);
    }
  }

  .highlight-span {
    display: inline-block;
    white-space: nowrap;
    margin: 0.5rem 0;
  }
`

const DiscoverButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #5E43FF;
  transform-origin: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 80px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    position: relative;
    margin-top: 3rem;
    width: 90% !important;
    transform: none;
    left: auto;
    padding: 1.5rem !important;
  }

  .discover-text {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    white-space: nowrap;
  }
`

export default function Hero() {
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const isMobile = useScreenSize();

  useEffect(() => {
    let ctx;
    
    // Wait for next frame to ensure DOM is ready
    const initializeGSAP = () => {
      gsap.registerPlugin(ScrollTrigger);
      
      ctx = gsap.context(() => {
        // Clear any existing ScrollTriggers
        ScrollTrigger.getAll().forEach(st => st.kill());
        
        if (!isMobile) {
          // Desktop animation
          gsap.set(buttonRef.current, {
            borderRadius: '80px',
          });

          gsap.set(textRef.current, {
            zIndex: 2
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=2000',
              pin: true,
              scrub: 1,
              onUpdate: (self) => {
                if (!buttonRef.current || !textRef.current) return;
                
                const buttonBounds = buttonRef.current.getBoundingClientRect();
                
                textRef.current.querySelectorAll('h1').forEach(h1 => {
                  const textBounds = h1.getBoundingClientRect();
                  
                  if (!(buttonBounds.right < textBounds.left || 
                      buttonBounds.left > textBounds.right || 
                      buttonBounds.bottom < textBounds.top || 
                      buttonBounds.top > textBounds.bottom)) {
                    gsap.to(h1, {
                      color: 'white',
                      duration: 0.1
                    });
                  } else {
                    gsap.to(h1, {
                      color: 'black',
                      duration: 0.1
                    });
                  }
                });
              }
            }
          });

          tl.to(buttonRef.current, {
            width: '95vh',
            height: '35vh',
            bottom: '0',
            duration: 1.5,
            ease: 'power2.inOut',
            borderRadius: 180,
          })
          .to(buttonRef.current, {
            width: '100vw',
            borderTopLeftRadius: 180,
            borderTopRightRadius: 180,
            height: '40vh',
            bottom: 0,
            borderRadius: 0,
            duration: 1,
            ease: 'power2.inOut'
          })
          .to(textRef.current, {
            y: '-40%',
            opacity: 0.6,
            duration: 1,
            ease: 'power2.inOut'
          });
        } else {
          // Mobile animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: 0.5,
            }
          });

          tl.to(buttonRef.current, {
            scale: 1.05,
            duration: 0.5,
            ease: 'power2.inOut'
          })
          .to(textRef.current, {
            y: '-10%',
            opacity: 0.8,
            duration: 0.5,
            ease: 'power2.inOut'
          });
        }
      }, sectionRef);
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(initializeGSAP);

    return () => {
      if (ctx) ctx.revert();
    };
  }, [isMobile]);

  return (
    <HeroSection ref={sectionRef} className='flex flex-col justify-center items-between'>
      <HeroText ref={textRef} className='hero-text px-4 md:px-12 flex flex-col justify-center items-center'>
        <h1>
          Your <span className='highlight-span text-[#5E43FF] bg-[#5e43ff4d] px-4 py-3 rounded-3xl'>
            partner
          </span>
        </h1>
        <h1>In Development and</h1>
        <h1 className='design'>Design</h1>
      </HeroText>
      
      <DiscoverButton 
        ref={buttonRef} 
        className='px-8 md:px-16 py-6 md:py-8 cursor-pointer'
      >
        <span className="discover-text">Discover Us</span>
      </DiscoverButton>
    </HeroSection>
  );
}