import React, { useRef, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "I really enjoyed working with Ilan from the Inprogress team. His quest for performance and velocity is miraculous and has helped the team achieve its goals.",
    author: "Nicolas Guillaume",
    role: "Product Owner, Le Monde",
    avatar: "/api/placeholder/96/96"
  },
  {
    text: "The team will quickly define your needs and propose adapted solutions. They will also not hesitate to argue their choices.",
    author: "Charles Lefebvre",
    role: "CEO, Company",
    avatar: "/api/placeholder/96/96"
  },
  {
    text: "Helped me in my tech projects, you can trust the process! Very satisfied.",
    author: "William Smith",
    role: "CTO, GoPopMe",
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
        setIsHalfViewport(self.progress > 0.5);
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
      <div className="py-16">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-[5rem] font-bold text-white">Customer reviews</h2>
          <p className="text-lg text-gray-400">They trust us, why not you?</p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_55%] min-w-0 pl-4 transition-opacity duration-300">
                  <div className="bg-[#f4f4f410] rounded-[50px] p-16 mx-2 transform transition-transform duration-300">
                    <div className="flex items-center justify-center mb-6">
                      <img
                        src={testimonial.avatar}
                        alt=""
                        className="w-24 h-24 rounded-full"
                      />
                    </div>
                    <p className="text-white text-2xl mb-6">{testimonial.text}</p>
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
          className={`relative mt-24 rounded-[50px] bg-[#5E43FF] transition-all duration-500 ${
            isHalfViewport ? 'min-h-screen' : 'min-h-[85vh] mx-8'
          }`}
        >
          <div className="px-36 py-24 flex flex-col justify-center items-center">
            <h3 className="text-white text-[5.5rem] leading-[6.5rem] font-bold text-center">
              The expertise of a team 🏢 combined with the proximity of a freelancer 🧑‍💻
            </h3>
            <div className="flex items-center gap-1 rounded-[50px] px-6 py-8 bg-white text-4xl text-[#202437] font-[500] mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
              <span>Contact us</span>
              <ArrowUpRight className="w-12 h-12" />
            </div>
          </div>

          {/* Footer */}
         
        </section>
        
      </div>
      <footer className=" bg-[#000] py-8 px-12">
            <div className="flex flex-col md:flex-row justify-between items-center text-white">
              <div className="flex flex-col gap-12">
              <Image src="/pinova_black_logo.png" alt="Pinova Logo" width={300} height={300}/>
              <div className='flex gap-12'>
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
              <div className="flex flex-col items-center gap-12">
              <div className="flex md:flex-col flex-row gap-6">
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
          </footer>
    </div>
  );
};

export default Testimonials;