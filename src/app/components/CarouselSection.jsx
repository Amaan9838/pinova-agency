'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import styled from '@emotion/styled'

const CarouselWrapper = styled.div`
  overflow: hidden;

   @media (max-width: 768px) {
    overflow-x: hidden;
    overflow-y: visible;
  }
`

const CarouselSections = styled.div`
  height: 100vh;
  background: #5E43FF;
  position: relative;

    @media (max-width: 768px) {
    min-height: 100vh;
    height: auto;
  }
`

const SlidesContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;

  @media (max-width: 768px) {
    position: relative;
    flex-direction: column;
  }
`

const Slide = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  h2 {
    font-size: clamp(3rem, 8vw, 7rem);
    color: white;
    font-family: var(--font-baloo2);
    line-height: 1;
    margin-bottom: 1rem;
    font-weight: 700;
    text-align: center;

    @media (max-width: 768px) {
      font-size: clamp(2.5rem, 6vw, 4rem);
    }
  }
  
  p {
    font-size: clamp(1rem, 2vw, 1.5rem);
    color: rgba(255, 255, 255, 0.8);
    font-family: var(--font-poppins);
    text-align: center;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 65vh;
    width: 100%;
    padding: 4rem 2rem;
  }
`

const ProgressBar = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;

   @media (max-width: 768px) {
    display: none;
  }
`

const ProgressDot = styled.div`
width: 50px;
  height: 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.3);
  
  &.active {
    background: white;
  }
`

const slides = [
  {
    title: "Our ability to adapt",
    subtitle: "We adapt to your needs and constraints. We are flexible and responsive."
  },
  {
    title: "Tailor-made support",
    subtitle: "We support you in carrying out your projects. We advise and guide you."
  },
  {
    title: "Our strength of proposition",
    subtitle: "We offer you innovative and creative solutions. We bring you our expertise."
  }
]

const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => {
      const width = document.documentElement.clientWidth || document.body.clientWidth;
      setIsMobile(width <= 768);
    };

    checkMobile();
    const resizeObserver = new ResizeObserver(() => {
      checkMobile();
    });

    resizeObserver.observe(document.documentElement);
    return () => resizeObserver.disconnect();
  }, []);

  return isMobile;
};

export default function CarouselSection() {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)
  const slidesContainerRef = useRef(null)
  const isMobile = useScreenSize();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      if (!isMobile) {
        // Desktop animations
        const slides = gsap.utils.toArray('.carousel-slide');
     gsap.to(slides, {
      xPercent: -100 * (slides.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (slides.length - 1),
        end: () => "+=" + slidesContainerRef.current.offsetWidth,
        onUpdate: (self) => {
            // Calculate which slide is active based on scroll progress
            const progress = Math.floor(self.progress * 3)
            document.querySelectorAll('.progress-dot').forEach((dot, index) => {
              dot.classList.toggle('active', index === progress)
            })
          }
      }
    });
  } else {
    // Mobile animations
    const slides = gsap.utils.toArray('.carousel-slide');
    slides.forEach((slide, i) => {
      gsap.to(slide, {
        scrollTrigger: {
          trigger: slide,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onEnter: () => updateProgress(i)
        }
      })
      gsap.from(slide.children, {
        scrollTrigger: {
          trigger: slide,
          start: "top 80%",
          end: "center center",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power3.out"
      });

       // Slide background reveal
       gsap.fromTo(slide, 
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scrollTrigger: {
            trigger: slide,
            start: "top 80%",
            end: "top 20%",
            scrub: 1
          },
          duration: 1,
          ease: "power2.inOut"
        }
      );
    });
    }
  });

  return () => ctx.revert();
}, [isMobile]);


  return (
    <CarouselWrapper ref={triggerRef}>
      <CarouselSections ref={sectionRef}>
        <SlidesContainer ref={slidesContainerRef}>
          {slides.map((slide, index) => (
            <Slide className='carousel-slide' key={index}>
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
            </Slide>
          ))}
        </SlidesContainer>
        <ProgressBar>
        {slides.map((_, index) => (
          <ProgressDot key={index} className="progress-dot" />
        ))}
      </ProgressBar>
      </CarouselSections>
    </CarouselWrapper>
  )
}
