import React,{useRef, useEffect} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
const testimonials = [
  {
    text: "I really enjoyed working with Ilan from the Inprogress team. His quest for performance and velocity is miraculous and has helped the team achieve its goals.",
    author: "Nicolas Guillaume",
    role: "Product Owner, Le Monde",
    avatar: "https://inprogress.agency/static/media/nicolas.fa3b503441c5a60dcaf6.webp"
  },
  {
    text: "The team will quickly define your needs and propose adapted solutions. They will also not hesitate to argue their choices.",
    author: "Charles Lefebvre",
    role: "CEO, Company",
    avatar: "https://inprogress.agency/static/media/nicolas.fa3b503441c5a60dcaf6.webp"
  },
  {
    text: "Helped me in my tech projects, you can trust the process! Very satisfied.",
    author: "William Smith",
    role: "CTO, GoPopMe",
    avatar: "https://inprogress.agency/static/media/nicolas.fa3b503441c5a60dcaf6.webp"
  }
];

const Testimonials = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        loop: true,
        skipSnaps: false,
        startIndex: 1
      });
      const headingRef = useRef(null);

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
      }, []);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="w-full mx-auto px-4 py-16 bg-[#202437]">
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
<div className="flex items-center justify-center gap-8">
        <button
          onClick={scrollPrev}
          className=" bg-transparent rounded-full border-2 border-white p-2 text-white hover:bg-gray-600 transition-colors"
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
      <section className='min-h-[85vh] mx-4 my-24 px-36 flex flex-col rounded-[50px] justify-center items-center bg-[#5E43FF] '>
        
        <h3 className='text-white text-[5.5rem] leading-[6.5rem] font-bold'>The expertise of a team 🏢 combined with the proximity of a freelancer 🧑‍💻</h3>
        <div className='flex items-center gap-1 rounded-[50px] px-6 py-8 bg-white text-4xl text-[#202437] font-[500] mt-4'> <span>Contact us</span> <ArrowUpRight className='w-12 h-12'/></div>
      </section>
    </div>
  );
};

export default Testimonials;