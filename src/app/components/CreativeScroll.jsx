import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styled from '@emotion/styled'

gsap.registerPlugin(ScrollTrigger);

const initialSlides = [
  {
    mainHeading: (
      <h1 className="text-6xl font-bold text-white leading-tight">
        We are a creative 🎨 and<br />
        passionate 🧠 team based<br />
        in Paris 🏠
      </h1>
    ),
    button: "Meet our team →",
    bgColor: "bg-[#5E43FF]"
  },
  {
    mainHeading: "We offer you ideal support from idea to implementation",
    bgColor: "bg-[#1E1E2E]"
  }
];

const contentSlides = [
  {
    mainHeading: "Ideation",
    subHeading: "We start by getting to know our clients, their goals and their target audience.",
  },
  {
    mainHeading: "Strategy",
    subHeading: "Developing comprehensive plans to achieve your objectives",
  },
  {
    mainHeading: "Implementation",
    subHeading: "Turning ideas into reality with precision and creativity",
  }
];

const CreativeScroll = () => {
    const containerRef = useRef(null);
    const progressBarRef = useRef(null);
    const fixedSectionRef = useRef(null);
    const slidesContainerRef = useRef(null);

    const ProgressBar = styled.div`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ProgressDot = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.3);
  
  &.active {
    background: white;
  }
`


  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fixed section with content slides
      const fixedSection = gsap.timeline({
        scrollTrigger: {
          trigger: fixedSectionRef.current,
          start: "top top",
          end: `+=${contentSlides.length * 100}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = Math.floor(self.progress * contentSlides.length)
            document.querySelectorAll('.progress-dot').forEach((dot, index) => {
              dot.classList.toggle('active', index === progress)
            })
          }
        }
      });

      // Vertical Slide with Ease
      contentSlides.forEach((_, index) => {
        if (index < contentSlides.length - 1) {
          fixedSection.to(`.content-slide-${index}`, {
            yPercent: -100,
            opacity: 0,
            ease: "power2.inOut",
            duration: 1,
          });
          fixedSection.fromTo(`.content-slide-${index + 1}`,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, ease: "power2.inOut", duration: 1 },
            "<"
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <section className="min-h-screen bg-[#5E43FF] rounded-3xl p-12 flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white leading-tight">
            We are a creative 🎨 and<br />
            passionate 🧠 team based<br />
            in Paris 🏠
          </h1>
          <button className="mt-8 bg-white text-purple-600 px-6 py-3 rounded-full font-medium">
            Meet our team →
          </button>
        </div>
      </section>

      <div className="bg-[#1E1E2E] p-24 flex items-center justify-center">
          <h1 className="text-[4rem] font-bold text-white mb-4">
            We offer you ideal support from idea to implementation
          </h1>
        </div>

      <section 
        ref={fixedSectionRef}
        className="min-h-screen bg-[#1E1E2E] relative"
      >
               
        <div 
          ref={slidesContainerRef}
          className="relative h-screen overflow-hidden"
        >
          {contentSlides.map((slide, index) => (
            <div
              key={index}
              className={`content-slide-${index} absolute top-0 left-0 w-full h-full flex items-center justify-center p-12`}
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-bold text-white mb-4">
                  {slide.mainHeading}
                </h2>
                <p className="text-xl text-gray-300 mt-4">
                  {slide.subHeading}
                </p>
              </div>
            </div>
          ))}
        </div>
        <ProgressBar>
    {contentSlides.map((_, slide) => (
      <ProgressDot key={slide} className="progress-dot" />
    ))}
  </ProgressBar>
      </section>
    </div>
  );
};

export default CreativeScroll;
