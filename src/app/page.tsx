import Hero from '@/app/components/Hero'
import CarouselSection from '@/app/components/CarouselSection'
import ServicesSection from '@/app/components/ServicesSection'
import CreativeScroll from '@/app/components/CreativeScroll'
import Testimonials from '@/app/components/Testimonials'
import Fortune500Section from '@/app/components/Fortune500Section'
import FullStackServices from '@/app/components/FullStackServices';
import FeaturedOn from '@/app/components/FeaturedOn';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pinova Technologies | Leading Web Development & Design Agency',
  description: 'Transform your digital presence with our expert web development, design, and digital solutions. Custom websites, mobile apps, and enterprise solutions.',
  alternates: {
    canonical: 'https://www.pinova.in'
  },
  openGraph: {
    title: 'Pinova Technologies | Web Development & Design Agency',
    description: 'Expert web development and design services for businesses worldwide',
    url: 'https://www.pinova.in',
    siteName: 'Pinova Technologies',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Pinova Technologies Homepage'
      }
    ],
    locale: 'en_US',
    type: 'website',
  }
}

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
