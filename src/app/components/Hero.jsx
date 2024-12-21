'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import styled from '@emotion/styled'

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: white;
  position: relative;
  overflow: hidden;
`

const HeroText = styled.div`
  h1 {
    font-size: clamp(3rem, 8vw, 7rem);
    line-height: 1;
    margin: 0;
    font-weight: 700;
    font-family: var(--font-baloo2);
    color: #000;
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
`

export default function Hero() {
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Initial state
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
            const buttonBounds = buttonRef.current.getBoundingClientRect();
            
            // Check each h1 element separately
            textRef.current.querySelectorAll('h1').forEach(h1 => {
              const textBounds = h1.getBoundingClientRect();
              
              // Check if button overlaps with this specific text element
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

      // First horizontal expansion
      tl.to(buttonRef.current, {
        width: '95vh',
        height: '35vh',
        bottom: '0',
        duration: 1.5,
        ease: 'power2.inOut',
        borderRadius:180,
      })
      // Then expand upwards
      // .to(buttonRef.current, {
      //   height: '25vh',
      //   bottom: '15vh',
      //   duration: 1.5,
      //   ease: 'power2.inOut'
      // })
      // Finally expand downwards
      .to(buttonRef.current, {
        width: '100vw',
        borderTopLeftRadius:180,
        borderTopRightRadius:180,
        height: '40vh',
        bottom: 0,
        borderRadius: 0,
        duration: 1,
        ease: 'power2.inOut'
      })

   // After the button expansion animation
      .to(textRef.current, {
  y: '-40%',
  opacity: 0.6,
  duration: 1,
  ease: 'power2.inOut',

}) // The '>' symbol makes this start right after the previous animation

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <HeroSection ref={sectionRef} className='flex flex-col justify-center items-between'>
      <HeroText ref={textRef} className='hero-text px-12 flex flex-col justify-center items-center'>
        <h1>
          Your <span className='text-[#5E43FF] bg-[#5e43ff4d] px-4 py-3 rounded-3xl relative inline-block'>
            partner
          </span>
        </h1>
        <h1>In Development and</h1>
        <h1 className='design'>Design</h1>
      </HeroText>
      
      <DiscoverButton 
        ref={buttonRef} 
        className='px-16 py-8 text-4xl cursor-pointer'
      >
        <span className="discover-text">Discover Us</span>
      </DiscoverButton>
    </HeroSection>
  );
}