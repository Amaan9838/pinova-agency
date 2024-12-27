import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "We came to pinova with nothing but a vague idea and a tight headline. Not only did they finish work on time, but also held our hands throughout the entire process! ",
    author: "Kaushal A.",
    role: "Founder of LAGOM PERFUMES",
    avatar: "/api/placeholder/96/96"
  },
  {
    text: "Never felt more personalzed befor like with pinova. The team's patience with my endless 'can we change this font ?' request was saintly. The support didn't stop after launch, either. Months later, they're still just one text away when i have a question or break something by accident! ",
    author: "D. Demir",
    role: "Owner of DokiCollections",
    avatar: "/api/placeholder/96/96"
  },
  {
    text: "Pinova helped us refine our strategy, plan our user journey, and fix every little hiccup. Before we even noticed it. From advising us on best practices, to expalining complex processes in plain english in a more relatable and realistic way but with a lot of more expertise and professionalism! Helped me in my tech projects, you can trust the process! Very satisfied.",
    author: "H. Sheikh",
    role: "Realator, UAE",
    avatar: "/api/placeholder/96/96"
  }
];

const footerLinks = {
  leftSection: [
    { text: "Privacy Policy", href: "#" },
    { text: "Terms", href: "#" },
    { text: "sales@pinova.in", href: "mailto:sales@pinova.in" }
  ],
  rightSection: [
    { text: "Our services", href: "#" },
    { text: "Our projects", href: "#" },
    { text: "How it works", href: "#" },
    { text: "Customer reviews", href: "#" }
  ]
};

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

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
    startIndex: 1
  });
  
  const headingRef = useRef(null);
  const blueRef = useRef(null);
  const [isHalfViewport, setIsHalfViewport] = useState(false);
  const isMobile = useScreenSize();

  useEffect(() => {
    gsap.from(headingRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top bottom",
        end: "top center",
        scrub: 1
      }
    });

    // Create scroll trigger for blue section
    const trigger = ScrollTrigger.create({
      trigger: blueRef.current,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        setIsHalfViewport(self.progress > 0.2);
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="w-full " style={{ background: 'linear-gradient(rgb(32, 36, 55), rgb(0, 0, 0))'}}>
      <div className="py-8 md:py-16">
        <div ref={headingRef} className="text-center mb-8 md:mb-12 px-4">
          <h2 className="text-[3rem] leading-[3.4rem] md:leading-[6.5rem] md:text-[5rem] font-bold text-white">Customer reviews</h2>
          <p className="text-base md:text-lg text-gray-400">They trust us, why not you?</p>
        </div>

        <div className="relative ">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_90%] md:flex-[0_0_55%] min-w-0 md:pl-4 transition-opacity duration-300">
                  <div className="bg-[#f4f4f410] rounded-[30px] md:rounded-[50px] p-8 md:p-16 mx-2 transform transition-transform duration-300">
                    <div className="flex items-center justify-center mb-6">
                      <img
                        src={testimonial.avatar}
                        alt=""
                        className="w-16 h-16 md:w-24 md:h-24 rounded-full"
                      />
                    </div>
                    <p className="text-lg md:text-2xl text-white mb-6">{testimonial.text}</p>
                    <div className="flex items-center">
                      <div>
                        <p className="text-white font-medium">{testimonial.author}</p>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 mt-8">
            <button
              onClick={scrollPrev}
              className="bg-transparent rounded-full border-2 border-white p-2 text-white hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="bg-transparent border-2 border-white rounded-full p-2 text-white hover:bg-gray-600 transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <section 
          ref={blueRef}
          className={`relative mt-16 md:mt-24 mx-4 rounded-[50px] bg-[#5E43FF] transition-all duration-500 ${
            isHalfViewport ? 'md:min-h-screen mx-0' : 'md:min-h-[85vh] mx-8'
          }`}
        >
          <div className="px-6 md:px-36 py-12 md:py-24 flex flex-col justify-center items-center">
            <h3 className="text-white text-[2.5rem] md:text-[5.5rem] leading-tight md:leading-[6.5rem] font-bold text-center">
              The expertise of a team 🏢 combined with the proximity of a freelancer 🧑‍💻
            </h3>
            <div className="flex items-center gap-1 rounded-[50px] px-4 md:px-6 py-4 md:py-8 bg-white text-2xl md:text-4xl text-[#202437] font-[500] mt-8 md:mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
              <span>Contact us</span>
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12" />
            </div>
          </div>

          {/* Footer */}
         
        </section>
        
      </div>
      {/* <footer className=" bg-[#000] py-6 md:py-8 px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 text-white">
              <div className="flex flex-col gap-12">
              <Image src="/pinova_black_logo.png" alt="Pinova Logo" width={300} height={300} className='w-48 md:w-64' />
              <div className='flex md:flex-row  flex-col md:gap-12 gap-4'>
                {footerLinks.leftSection.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href}
                    className={`text-lg ${
                      link.text === 'sales@pinova.in' 
                        ? 'text-white font-semibold' 
                        : 'text-gray-400 hover:text-white'
                    } transition-colors`}>
                    {link.text}
                  </a>
                ))}
                </div>
              </div>
              <div className="flex flex-col md:items-center  gap-12">
              <div className=" hidden md:flex md:flex-col flex-row gap-6">
  <div className="flex gap-12">
    {footerLinks.rightSection.slice(0, 2).map((link, index) => (
      <a 
        key={index}
        href={link.href}
        className="text-gray-400 font-semibold text-lg hover:text-white transition-colors"
      >
        {link.text}
      </a>
    ))}
  </div>
  <div className="flex gap-12">
    {footerLinks.rightSection.slice(2, 4).map((link, index) => (
      <a 
        key={index}
        href={link.href}
        className="text-gray-400 font-semibold text-lg hover:text-white transition-colors"
      >
        {link.text}
      </a>
    ))}
  </div>
</div>

                <a 
                  href="#top" 
                  className="flex items-center gap-2 text-white border border-white rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
                >
                  Back to top
                </a>
              </div>
            </div>
          </footer> */}
    </div>
  );
};

export default Testimonials;