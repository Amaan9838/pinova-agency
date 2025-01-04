'use client'

import Hero from '@/app/components/Hero'
import CarouselSection from '@/app/components/CarouselSection'
import ServicesSection from '@/app/components/ServicesSection'
import CreativeScroll from '@/app/components/CreativeScroll'
import Testimonials from '@/app/components/Testimonials'
import Fortune500Section from '@/app/components/Fortune500Section'
import FullStackServices from '@/app/components/FullStackServices';
import FeaturedOn from '@/app/components/FeaturedOn';

export default function Home() {
  return (
    <main>
        <Hero />
        <CarouselSection />
        <FullStackServices/>
        <Fortune500Section/>
        <ServicesSection/>
<FeaturedOn/>
        <CreativeScroll/>
        <Testimonials/>
    </main>
  )
}
