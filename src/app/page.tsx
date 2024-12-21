'use client'

import Navigation from '@/app/components/Navigation'
import Hero from '@/app/components/Hero'
import Projects from '@/app/components/Project';
import CustomCursor from '@/app/components/CustomCursor'
import CarouselSection from '@/app/components/CarouselSection'
import ServicesSection from '@/app/components/ServicesSection';
import CreativeScroll from '@/app/components/CreativeScroll';
import Testimonials from '@/app/components/Testimonials';

export default function Home() {
  return (
    <main>
      <CustomCursor />
      {/* <SmoothScroll> */}
        <Navigation />
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
