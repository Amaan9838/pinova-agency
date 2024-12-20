'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import styled from '@emotion/styled'
import DiscoverSection from './DiscoverSection'

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: white;
  position: relative;
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

export default function Hero() {
  const textRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Initial animation
      gsap.from('.hero-text', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        stagger: 0.2
      });

      // Pin the entire section during discover animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1000',
        pin: true,
        pinSpacing: false
      });
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <HeroSection ref={sectionRef}>
        <HeroText ref={textRef} className='px-12 flex flex-col justify-center items-center'> 
          <h1 className="hero-text">Your <span className='text-[#5E43FF] bg-[#5e43ff4d] px-4 py-3 rounded-3xl relative inline-block'>partner</span></h1>
          <h1 className="hero-text">In Development and</h1>
          <h1 className="hero-text">Design</h1>
          <p className="hero-text text-xl mt-8 opacity-80">
            Design • Development • Strategy
          </p>
        </HeroText>      
      </HeroSection>
      <DiscoverSection />
    </>
  );
}
