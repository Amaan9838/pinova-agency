'use client';
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styled from "@emotion/styled";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);


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

const StyledSection = styled.section`
  min-height: 100vh;
  
  h1 {
    font-size: clamp(3rem, 8vw, 6rem);
    
    @media (max-width: 768px) {
      font-size: clamp(2rem, 6vw, 3rem);
      line-height: 1.3;
    }
  }

  button {
    @media (max-width: 768px) {
      padding: 1rem 2rem;
      font-size: 1.5rem;
    }
  }
`

const ContentSection = styled.div`
  h2 {
    @media (max-width: 768px) {
      font-size: clamp(2.5rem, 6vw, 4rem);
    }
  }
  
  p {
    @media (max-width: 768px) {
      font-size: clamp(1rem, 4vw, 1.5rem);
    }
  }
`

const contentSlides = [
  {
    mainHeading: "Ideation",
    subHeading:
      "We start by obsessing over your goals, audience and wildest ideas. No detail is too small (or too extra).",
    imageUrl: "/ideation.jpeg"
  },
  {
    mainHeading: "Strategy",
    subHeading: "Crafting master plans so solid, even your competitors might sneak a peek. Objectives? Consider them conquered.",
    imageUrl: "/strategy.jpeg"
  },
  {
    mainHeading: "Implementation",
    subHeading: "Where dreams become reality and reality gets a glow-up. Expect precision, creativity, and maybe a tiny bit of magic.",
    imageUrl: "/implementation.png"
  },
];



const CreativeScroll = () => {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const fixedSectionRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useScreenSize();

  const ProgressBar = styled.div`
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `;

  const ProgressDot = styled.div`
  width: 10px;
  height: 75px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.3);
  transition: background 0.3s ease;

  &.active {
    background: white;
    height: 100px; // Optional: make active dot taller
  }
`;


  useEffect(() => {
    let ctx = gsap.context(() => {
     
      if (!isMobile) {
      // Fixed section with content slides
      const fixedSection = gsap.timeline({
        scrollTrigger: {
          trigger: fixedSectionRef.current,
          start: "top top",
          end: `+=${contentSlides.length * 100}%`,
          pin: true,
          scrub: 2,
          anticipatePin: 1, // Anticipate pinning to prevent flickering
          fastScrollEnd: true, // Add this
    preventOverlaps: true, // Add this
          onUpdate: (self) => {
            // Calculate the active index based on scroll progress
            const newIndex = Math.round(self.progress * (contentSlides.length - 1));
            setActiveIndex(newIndex);
          },       
        },
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
          fixedSection.fromTo(
            `.content-slide-${index + 1}`,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, ease: "power2.inOut", duration: 1 },
            "<"
          );
        }
      });

      gsap.to(".blue-section", {
        scrollTrigger: {
          trigger: ".black-section",
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
        marginTop: "-150px",
        ease: "power2.inOut"
      });

    } else {
      // Mobile animations
      const slides = gsap.utils.toArray('.content-slide');
      slides.forEach((slide, index) => {
        gsap.set(slide, {
          position: 'relative',
          opacity: 1,
          yPercent: 0
        });
      });

      slides.forEach((slide, index) => {
        const isEven = index % 2 === 0;
        
        gsap.from(slide, {
          scrollTrigger: {
            trigger: slide,
            start: "top 70%",
            end: "top 20%",
            scrub: 1
          },
          x: isEven ? -100 : 100,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out"
        });
      });

      gsap.from(".blue-section", {
        scrollTrigger: {
          trigger: ".blue-section",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
        scale: 0.9,
        borderRadius: "120px",
        duration: 1.5
      });

      // Text and button reveal
      gsap.from(".blue-section h1, .blue-section button", {
        scrollTrigger: {
          trigger: ".blue-section",
          start: "top 80%",
          end: "center center",
        },
        y: 100,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out"
      });

   
      slides.forEach((slide, index) => {
        const elements = slide.querySelectorAll('h2, p, img');
        
        gsap.from(elements, {
          scrollTrigger: {
            trigger: slide,
            start: "top 70%",
            end: "center center",
          },
          y: 60,
          opacity: 0,
          scale: 0.95,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out"
        });
      });

      // Progress dots fade in
      gsap.from(".progress-dot", {
        scrollTrigger: {
          trigger: fixedSectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        },
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.8
      });
    }
    });


    return () => ctx.revert();
  }, [isMobile]);

  

  return (
    <div ref={containerRef} className="relative">
      <section className="blue-section md:min-h-screen min-h-[65vh] bg-[#5E43FF] rounded-[80px] md:p-8 px-3 py-12 mx-4 md:mx-8 flex items-center justify-center relative z-20">
        <div className="text-center mx-auto px-4 md:px-0">
          <h1 className="md:text-[6rem] text-4xl font-bold text-white leading-tight">
            We are a creative 🎨 and
            <br />
            passionate 🧠 team serving
            <br />
            across the Globe 🌏
          </h1>
          <a href="/contact">
          <button className="mt-8 bg-white text-black rounded-full md:text-4xl text-2xl px-6 py-6 md:px-8 md:py-10 font-semibold hover:bg-black hover:text-white transition-colors duration-300">
           Let&apos;s talk, It&apos;s Free →
          </button>
          </a>
        </div>
      </section>

      <div
        className="black-section  bg-[#1E1E2E] text-center relative z-10 pt-16 px-6  md:pt-[140px] md:px-[120px] md:pb-[72px]"
      >
        <h1 className="md:text-[6rem] text-4xl md:leading-[6rem] font-bold text-white">
          We offer you ideal support from idea to implementation
        </h1>
      </div>

      <section
        ref={fixedSectionRef}
        className="min-h-screen bg-[#1E1E2E] relative"
        style={{ backfaceVisibility: 'hidden' }} // Add this

      >
           <div className="hidden absolute left-8 top-1/2 -translate-y-1/2 md:flex flex-col gap-4">
          {contentSlides.map((_, index) => (
            <div
              key={index}
              className={`progress-dot w-2.5 transition-all duration-300 rounded-full ${
                index === activeIndex 
                  ? "bg-white h-24" 
                  : "bg-white/30 h-20"
              }`}
            />
          ))}
        </div>
        <div
          ref={slidesContainerRef}
          className={`${isMobile ? 'relative' : 'relative h-screen'} overflow-hidden`}
 >
          {contentSlides.map((slide, index) => (
            <div
              key={index}
              className={`content-slide content-slide-${index}  ${isMobile ? 'relative' : 'absolute'} top-0 left-0 w-full h-full flex md:flex-row flex-col-reverse md:items-end items-center md:justify-between justify-start py-6 md:p-12`}
              style={{ opacity: isMobile ? 1 : index === 0 ? 1 : 0 }}
              >
              <div className="md:py-24 py-12 md:px-12 px-6 text-center md:text-left">
                <h2 className="md:text-[6rem] text-[2.6rem] font-bold text-white">
                  {slide.mainHeading}
                </h2>
                <p className="text-xl md:text-4xl md:text-gray-300 text-gray-400">{slide.subHeading}</p>
              </div>
              <Image
  alt="presentation"
  src={slide.imageUrl}
  width={1200}
  height={800}
  priority={false}
  quality={85}
  className="rounded-3xl mt-12 md:mt-0 w-full h-auto object-cover max-w-[300px] md:max-w-none md:h-[600px] xl:h-[800px]"
  sizes="(max-width: 768px) 200px, (max-width: 1180px) 33vw, 1200px"
/>
 </div>
          ))}
        </div>
       
      </section>
    </div>
  );
};

export default CreativeScroll;
