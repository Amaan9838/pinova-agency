'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import styled from '@emotion/styled'
import { ArrowUpRight } from 'lucide-react'

const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => {
      // Using document.documentElement for more reliable width detection
      const width = document.documentElement.clientWidth || document.body.clientWidth;
      setIsMobile(width <= 768);
    };

    // Check immediately after mount
    checkMobile();

    // Setup resize observer for more reliable detection
    const resizeObserver = new ResizeObserver(() => {
      checkMobile();
    });

    resizeObserver.observe(document.documentElement);

    // Cleanup
    return () => resizeObserver.disconnect();
  }, []);

  return isMobile;
};

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: white;
  position: relative;
  overflow: hidden;

   @media (max-width: 768px) {
   height: 68vh;
    flex-direction: column;
    justify-content: center;
    margin-bottom: -50px;
  }
`

const HeroText = styled.div`
  h1 {
    font-size: clamp(3rem, 8vw, 7rem);
    line-height: 1.2;
    font-weight: 700;
    font-family: var(--font-baloo2);
    color: #000;
    text-align: center;
    transition: font-size 0.3s ease;
   
    @media (max-width: 768px) {
      font-size: clamp(3.5rem, 12vw, 4rem);
       line-height: 1;
    }

    @media (max-width: 480px) {
      font-size: clamp(3rem, 5vw, 3rem);
    }

  }
    .highlight-span {
    display: inline-block;
    white-space: nowrap;
    margin: 0.5rem 0;
  }
`

const DiscoverButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #5E43FF;
  transform-origin: center;
  display: flex;
  align-items: center;
  justify-content: center;

 transition: all 0.3s ease;

   @media (max-width: 768px) {
   display: none;
  }

  .discover-text {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    white-space: nowrap;
  }
`

export default function Hero() {
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const isMobile = useScreenSize();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Initial state
       if (!isMobile) {
      gsap.set(buttonRef.current, {

        borderRadius: '80px',
      });

      gsap.set(textRef.current, {
        zIndex: 2
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2000',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // First horizontal expansion
      // Capsule-like expansion
tl.to(buttonRef.current, {
  width: '100vw', // Expand to full width
  height: '60vh', // Expand height to desired capsule size
  bottom: 0,
  duration: 1, // Adjust duration for smooth expansion
  ease: 'power2.inOut',
  borderTopLeftRadius: '30vh', // Maintain a consistent border radius for capsule shape
  borderTopRightRadius: '30vh', // Maintain a consistent border radius for capsule shape
  borderBottomLeftRadius: '5vh', // Remove bottom left radius
  borderBottomRightRadius: '5vh', // Remove bottom right radius
  
  borderBottomLeftRadius: 0, // Remove bottom left radius
borderBottomRightRadius: 0, // Remove bottom right radius
onUpdate: () => {
  // Ensure the text remains centered
  gsap.set(buttonRef.current.querySelector('.discover-text'), {
    y: 0 // Keep the text vertically centered
  });
}
})
      // Then expand upwards
      // .to(buttonRef.current, {
      //   height: '25vh',
      //   bottom: '15vh',
      //   duration: 1.5,
      //   ease: 'power2.inOut'
      // })
      // Finally expand downwards
      .to(buttonRef.current, {
        width: '100vw',
        borderTopLeftRadius:'30vh',
        borderTopRightRadius:'30vh',
        height: '60vh',
        bottom: 0,
        borderRadius: 0,
        duration: 1,
        ease: 'power2.inOut'
      })

   // After the button expansion animation
      .to(textRef.current, {
  y: '-40%',
  opacity: 0.6,
  duration: 1,
  ease: 'power2.inOut'
}); // The '>' symbol makes this start right after the previous animation
// Initial text reveal animation
const textElements = gsap.utils.toArray('.hero-text h1');
  
textElements.forEach((text, index) => {
  gsap.from(text, {
    duration: 1.5,
    y: 150,
    opacity: 0,
    ease: "power4.out",
    delay: index * 0.3,
    rotationX: 50,
    transformOrigin: "0% 50% -50",
    stagger: {
      amount: 0.3
    }
  });
});

// Special animation for highlighted span
gsap.from('.highlight-span', {
  scale: 1.5,
  opacity: 0,
  duration: 1.8,
  delay: 0.8,
  ease: "elastic.out(1, 0.3)",
  transformOrigin: "center center"
});

// Subtle floating animation after initial reveal
gsap.to('.hero-text', {
  y: 15,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});
}
else {
  // Mobile animation
   // Initial load animations
   gsap.from('.hero-text h1', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: 'power3.out'
  });

  // Highlight span special animation
  gsap.from('.highlight-span', {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: 'elastic.out(1, 0.8)'
  });

  // Discover button entrance
  gsap.from('.discover-text', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: 'power2.out'
  });

  // Scroll animation
  gsap.to('.hero-text', {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=300',
      scrub: 1
    },
    y: '-50%',
    opacity: 0,
    ease: 'power2.inOut'
  });
}
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleButtonClick = () => {
    // Expand the button
if(!isMobile) {
    gsap.to(buttonRef.current, {
      width: '100vw', // Expand to full width
      height: '60vh', // Expand height to desired capsule size
      bottom: 0,
      duration: 1, // Adjust duration for smooth expansion
      // ease: 'power2.inOut',
      borderTopLeftRadius: '30vh', // Maintain a consistent border radius for capsule shape
      borderTopRightRadius: '30vh', // Maintain a consistent border radius for capsule shape
      borderBottomLeftRadius: '5vh', // Remove bottom left radius
      borderBottomRightRadius: '5vh', // Remove bottom right radius
      
      borderBottomLeftRadius: 0, // Remove bottom left radius
    borderBottomRightRadius: 0, // Remove bottom right radius
    
      onComplete: () => {
        // Scroll to the next section after expansion
        gsap.to(window, {
          scrollTo: { y: window.scrollY + 2800 }, // Scroll down by 3000px
          duration: 5, // Duration of the scroll animation
          ease: 'power2.inOut' // Easing function
        
        });
       }
    })
  
  }
  };


  return (
    <HeroSection ref={sectionRef} className='flex flex-col sm:justify-center justify-end items-between'>
      <HeroText ref={textRef} className='hero-text px-4 md:px-12 flex flex-col justify-center items-center'>
        <h1 className='md:mt-0 mt-[-10px] ' >
          Your <span className='highlight-span  text-[#5E43FF] bg-[#5e43ff4d] sm:px-4 sm:py-3 px-2 py-1 sm:rounded-3xl rounded-2xl relative inline-block'>
            partner
          </span>
        </h1>
        <h1>In Development and</h1>
        <h1 className='design'>Design</h1>
      </HeroText>
      
      <DiscoverButton 
        ref={buttonRef} 
        className='px-4 py-6 md:px-36 md:py-12 md:text-4xl text-2xl sm:rounded-[80px] rounded-tl-[80px] rounded-tr-[80px]'
        data-hover
        onClick={handleButtonClick} // Add click handler
       
      >

      </DiscoverButton>
     <div className=' absolute bottom-[5%] sm:flex items-end gap-1 pointer-events-none'><span className="discover-text text-4xl font-semibold ">Discover us </span><ArrowUpRight className='w-12 h-12 -ml-2 -mb-1'/></div> 

    </HeroSection>
  );
}