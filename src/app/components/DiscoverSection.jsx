'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import styled from '@emotion/styled'

const DiscoverWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: start;
  justify-content: center;
  padding-top: 5rem;
  overflow: hidden;
`

const DiscoverButton = styled.div`
  width: 200px;
  height: 60px;
  background: #5E43FF;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: var(--font-baloo2);
  font-size: 1.2rem;
  transform-origin: center;
`

export default function DiscoverSection() {
  const sectionRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1000',
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    })

    timeline
      .to(buttonRef.current, {
        width: '90vw',
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(buttonRef.current, {
        height: '80vh',
        duration: 1,
        ease: 'power2.inOut'
      })

  }, [])

  return (
    <DiscoverWrapper ref={sectionRef}>
      <DiscoverButton ref={buttonRef}>
        Discover Us
      </DiscoverButton>
    </DiscoverWrapper>
  )
}
