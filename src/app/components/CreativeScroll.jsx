'use client';
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styled from "@emotion/styled";

gsap.registerPlugin(ScrollTrigger);

const initialSlides = [
  {
    mainHeading: (
      <h1 className="text-6xl font-bold text-white leading-tight">
        We are a creative 🎨 and
        <br />
        passionate 🧠 team based
        <br />
        in Paris 🏠
      </h1>
    ),
    button: "Meet our team →",
    bgColor: "bg-[#5E43FF]",
  },
  {
    mainHeading: "We offer you ideal support from idea to implementation",
    bgColor: "bg-[#1E1E2E]",
  },
];

const contentSlides = [
  {
    mainHeading: "Ideation",
    subHeading:
      "We start by getting to know our clients, their goals and their target audience.",
  },
  {
    mainHeading: "Strategy",
    subHeading: "Developing comprehensive plans to achieve your objectives",
  },
  {
    mainHeading: "Implementation",
    subHeading: "Turning ideas into reality with precision and creativity",
  },
];

const CreativeScroll = () => {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const fixedSectionRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
      // Fixed section with content slides
      const fixedSection = gsap.timeline({
        scrollTrigger: {
          trigger: fixedSectionRef.current,
          start: "top top",
          end: `+=${contentSlides.length * 100}%`,
          pin: true,
          scrub: 1,
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
    });


    return () => ctx.revert();
  }, []);

  

  return (
    <div ref={containerRef} className="relative">
      <section className="blue-section min-h-screen bg-[#5E43FF] rounded-[80px] p-8 mx-8  flex items-center justify-center relative z-20">
        <div className="text-center mx-auto">
          <h1 className="text-[6rem] font-bold text-white leading-tight">
            We are a creative 🎨 and
            <br />
            passionate 🧠 team based
            <br />
            in Paris 🏠
          </h1>
          <button className="mt-8 bg-white text-black rounded-full text-4xl px-8 py-10 font-semibold">
            Meet our team →
          </button>
        </div>
      </section>

      <div
        className="black-section  bg-[#1E1E2E] text-center relative z-10"
        style={{ padding: "140px 120px 72px" }}
      >
        <h1 className="text-[6rem] leading-[6rem] font-bold text-white">
          We offer you ideal support from idea to implementation
        </h1>
      </div>

      <section
        ref={fixedSectionRef}
        className="min-h-screen bg-[#1E1E2E] relative"
      >
           <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
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
          className="relative h-screen overflow-hidden"
        >
          {contentSlides.map((slide, index) => (
            <div
              key={index}
              className={`content-slide-${index} absolute top-0 left-0 w-full h-full flex items-end justify-between p-12`}
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <div className="py-24 px-12">
                <h2 className="text-[6rem] font-bold text-white">
                  {slide.mainHeading}
                </h2>
                <p className="text-4xl text-gray-300">{slide.subHeading}</p>
              </div>
              <img alt="presentation" src="https://inprogress.agency/static/media/frame4.f5185cd9c489dc53b491.webp" loading="lazy" class="h-full rounded-3xl max-[1180px]:h-auto max-[1180px]:w-1/3 max-md:w-[200px]"></img>
            </div>
          ))}
        </div>
       
      </section>
    </div>
  );
};

export default CreativeScroll;
