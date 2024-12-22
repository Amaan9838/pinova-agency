'use client'

import Hero from '@/app/components/Hero'
import CarouselSection from '@/app/components/CarouselSection'
import ServicesSection from '@/app/components/ServicesSection';
import CreativeScroll from '@/app/components/CreativeScroll';
import Testimonials from '@/app/components/Testimonials';

export default function Home() {
  return (
    <main>
     
        <Hero />
        {/* <Projects /> */}
        <CarouselSection />
        <ServicesSection/>
        <CreativeScroll/>
        <Testimonials/>
        
        {/* <About />
        <Footer />
      </SmoothScroll> */}
    </main>
  )
}
