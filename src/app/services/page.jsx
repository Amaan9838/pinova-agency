'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Button  from '../components/Button';
import { Code, Paintbrush, LayoutTemplate, Search } from 'lucide-react'
import Link from 'next/link';

const services = [
  {
    title: "Web Development",
    description: "Transform your vision into a powerful, scalable web application using cutting-edge technologies. Our development team crafts clean, efficient code that drives results.",
    features: [
      "Custom Web Applications",
      "E-commerce Solutions",
      "API Integration",
      "Database Architecture"
    ],
    icon: Code,
    bgClass: "bg-gradient-to-br from-blue-50 to-cyan-50",
    accentColor: "text-blue-600",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    stats: {
      value: "100+",
      label: "Projects Delivered"
    }
  },
  {
    title: "Web Design",
    description: "Create stunning, user-centric designs that capture attention and drive engagement. We blend aesthetics with functionality for maximum impact.",
    features: [
      "UI/UX Design",
      "Responsive Layouts",
      "Brand Integration",
      "Interactive Prototypes"
    ],
    icon: Paintbrush,
    bgClass: "bg-gradient-to-br from-purple-50 to-indigo-50",
    accentColor: "text-indigo-600",
    buttonColor: "bg-indigo-600 hover:bg-indigo-700",
    stats: {
      value: "95%",
      label: "Client Satisfaction"
    }
  },
  {
    title: "Website Redesign",
    description: "Breathe new life into your existing website with modern design principles and enhanced functionality that keeps users coming back.",
    features: [
      "UX Audit",
      "Performance Optimization",
      "Modern Technologies",
      "Content Strategy"
    ],
    icon: LayoutTemplate,
    bgClass: "bg-gradient-to-br from-emerald-50 to-teal-50",
    accentColor: "text-emerald-600",
    buttonColor: "bg-emerald-600 hover:bg-emerald-700",
    stats: {
      value: "40%",
      label: "Avg. Conversion Increase"
    }
  },
  {
    title: "SEO Optimization",
    description: "Boost your online visibility and drive organic traffic with our data-driven SEO strategies and content optimization techniques.",
    features: [
      "Keyword Research",
      "Technical SEO",
      "Content Strategy",
      "Performance Tracking"
    ],
    icon: Search,
    bgClass: "bg-gradient-to-br from-orange-50 to-rose-50",
    accentColor: "text-rose-600",
    buttonColor: "bg-rose-600 hover:bg-rose-700",
    stats: {
      value: "5x",
      label: "Traffic Growth"
    }
  }
]
function ParallaxSection({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}



export default function Services() {
  return (
    <section className="relative min-h-screen py-36 px-1 sm:px-3 ">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-fixed opacity-5" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <ParallaxSection>
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
                Elevate Your Digital Presence
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                We Create Digital
                <br />
                Excellence
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Merging creativity, technology, and strategy to deliver extraordinary digital experiences that drive measurable business growth
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
              <Link href="/contact">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg">
                  Start Your Project
                </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </ParallaxSection>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${service.bgClass} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500`}
            >
              <div className="flex items-start justify-between mb-8">
                <div className={`p-4 rounded-2xl ${service.bgClass} shadow-lg`}>
                  <service.icon className={`w-8 h-8 ${service.accentColor}`} />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
              <p className="text-gray-600 mb-8">{service.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${service.accentColor.replace('text-', 'bg-')}`} />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="p-4 bg-white/50 rounded-xl">
                  <div className={`${service.accentColor} text-2xl font-bold`}>
                    {service.stats.value}
                  </div>
                  <div className="text-sm text-gray-600">{service.stats.label}</div>
                </div>
                
                <button className={`${service.buttonColor} text-white px-6 py-3 rounded-xl`}>
                  Learn More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}