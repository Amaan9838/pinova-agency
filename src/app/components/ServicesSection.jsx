'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import styled from '@emotion/styled'

const ServicesWrapper = styled.div`
  overflow: hidden;

   @media (max-width: 768px) {
    overflow-x: hidden;
    overflow-y: visible;
  }
`

const ServicesSections = styled.div`
  height: 100vh;
  background: #fff;
  position: relative;

    @media (max-width: 768px) {
    min-height: 65vh;
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
  width: 75vw;
  text-align: left;
    padding-left: 5rem;
padding-right: 5rem;
padding-top: 7.5rem;
padding-bottom: 7.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
   @media (max-width: 768px) {
    width: 100%;
    padding: 2rem 0.5rem;
    min-height: 65vh;
  }

  h2 {
    font-size: clamp(2.5rem, 6vw, 5rem);
    color: #000;
    font-family: var(--font-baloo2);
    line-height: 1.2;
    margin-bottom: 1.5rem;
    font-weight: 700;

     @media (max-width: 768px) {
      font-size: clamp(2rem, 5vw, 3.5rem);
    }
  }
  
  p {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    color: rgba(0, 0, 0, 0.6);
    font-family: var(--font-poppins);
    max-width: 600px;

     @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`

const ServiceButton = styled.div`
  padding: 0.8rem 2rem;
  border-radius: 30px;
  border: 2px solid #5E43FF;
  color:  #5E43FF;
  font-family: var(--font-baloo2);
  display: inline-block;
  font-weight: 700;
  margin-bottom: 2rem;
`

const ServiceCard = styled.div`
  background: #f8f8f8;
  padding-left: 5rem;
  padding-right: 5rem;
  padding-top: 10.5rem;
  padding-bottom: 10.5rem;
  border-radius: 30px;
  width: 75vw;
  
  h2 {
    font-size: clamp(2.5rem, 6vw, 5rem);
    color: #000;
    font-family: var(--font-baloo2);
    line-height: 1.2;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }
  
  p {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    color: rgba(0, 0, 0, 0.6);
    font-family: var(--font-poppins);
    max-width: 600px;
  }

   @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
    padding: 3rem 2rem;
  }
`


const ToolButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  background: rgba(94, 67, 255, 0.1);
  color: #5E43FF;
  font-family: var(--font-poppins);
  margin-right: 1rem;
  margin-top: 1rem;
`

const slides = [
  {
    type: 'intro',
    title: 'A complete tech product team',
    content: 'We are a team of developers, designers and project managers. The goal is to excel in each area and create high-quality digital products.'
  },
  {
    type: 'service',
    title: 'Design',
    number: '001',
    content: 'We take into account user interaction with the interface. We pay special attention to hypothesis testing and prototyping, only the most successful solutions are retained for visualization.',
    tools: ['Figma', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator']
  },
  {
    type: 'service',
    title: 'Development',
    number: '002',
    content: 'We develop web and mobile applications. We use the latest technologies and best practices to create digital products that are scalable and maintainable over time solutions are retained for visualization.',
    tools: ['React', 'Node.js', 'Python', 'AWS']
  },
  {
    type: 'service',
    title: 'Strategy',
    number: '003',
    content: 'Nothing makes sense without good organization. We use agile methods to manage our projects. We are transparent and communicate regularly with our clients to keep them informed of the progress of the project.',
    tools: ['Analytics', 'SEO', 'Marketing', 'Optimization']
  }
]


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

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)
  const slidesContainerRef = useRef(null)
  const isMobile = useScreenSize();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      if (!isMobile) {
        const slides = gsap.utils.toArray('.service-slide');
        gsap.to(slides, {
          xPercent: -100 * (slides.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (slides.length - 1),
            end: () => "+=" + slidesContainerRef.current.offsetWidth
          }
        });
      }else {
        // Intro section animation
        gsap.from('.service-slide:first-child', {
          scrollTrigger: {
            trigger: '.service-slide:first-child',
            start: 'top 80%',
            end: 'center center',
            scrub: 1
          },
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out'
        });
  
        // Service cards staggered reveal
        const cards = gsap.utils.toArray('.service-slide:not(:first-child)');
        cards.forEach((card, index) => {
          const direction = index % 2 === 0 ? -100 : 100;
          
          // Card container animation
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              end: 'top 25%',
              scrub: 1
            },
            x: direction,
            opacity: 0,
            scale: 0.9,
            duration: 1
          });
  
          // Card content staggered animation
          gsap.from(card.querySelectorAll('h2, p, .tools'), {
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              end: 'top 30%'
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power2.out'
          });
        });
  
        // Tool buttons pop-in effect
        gsap.from('.tools button', {
          scrollTrigger: {
            trigger: '.tools',
            start: 'top 80%'
          },
          scale: 0,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        });
      }
    });

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <ServicesWrapper ref={triggerRef}>
      <ServicesSections ref={sectionRef}>
        <SlidesContainer ref={slidesContainerRef}>
          {slides.map((slide, index) => (
            <Slide className={`service-slide `}  key={index}>
              {slide.type === 'intro' ? (
                <div className='px-[1.5rem] sm:px-0'>
                  <ServiceButton>Services</ServiceButton>
                  <h2>{slide.title}</h2>
                  <p>{slide.content}</p>
                </div>
              ) : (
                index === 1 ? (
                  <ServiceCard className='md:ml-[-20vh]'>
                  <h2>{slide.title} <span style={{opacity: 0.3}}>_{slide.number}</span></h2>
                  <p>{slide.content}</p>
                  <div className="tools">
                    {slide.tools.map((tool, i) => (
                      <ToolButton key={i}>{tool}</ToolButton>
                    ))}
                  </div>
                </ServiceCard>
                ) : (
                <ServiceCard>
                  <h2>{slide.title} <span style={{opacity: 0.3}}>_{slide.number}</span></h2>
                  <p>{slide.content}</p>
                  <div className="tools">
                    {slide.tools.map((tool, i) => (
                      <ToolButton key={i}>{tool}</ToolButton>
                    ))}
                  </div>
                </ServiceCard>
              ))}
            </Slide>
          ))}
        </SlidesContainer>
      </ServicesSections>
    </ServicesWrapper>
  )
}
