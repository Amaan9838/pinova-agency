'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import styled from '@emotion/styled'

const ServicesWrapper = styled.div`
  overflow: hidden;
`

const ServicesSections = styled.div`
  height: 100vh;
  background: #fff;
  position: relative;
`

const SlidesContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
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

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)
  const slidesContainerRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const slides = gsap.utils.toArray('.service-slide')
    
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
    })
  }, [])

  return (
    <ServicesWrapper ref={triggerRef}>
      <ServicesSections ref={sectionRef}>
        <SlidesContainer ref={slidesContainerRef}>
          {slides.map((slide, index) => (
            <Slide className='service-slide' key={index}>
              {slide.type === 'intro' ? (
                <div>
                  <ServiceButton>Services</ServiceButton>
                  <h2>{slide.title}</h2>
                  <p>{slide.content}</p>
                </div>
              ) : (
                index === 1 ? (
                  <ServiceCard className='ml-[-20vh]'>
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
