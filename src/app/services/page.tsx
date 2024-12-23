'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { 
  ArrowUpRight, Sparkles, Zap, Target, Palette, Code, Globe, TrendingUp,
  Smartphone, Search, Video, MessageSquare, BarChart, Shield
} from 'lucide-react'
import Button  from '@/app/components/button';

const services = [
  {
    title: "Strategic Brand Evolution",
    description: "Transform your market position with data-driven brand strategies and immersive digital experiences that captivate and convert.",
    features: [
      "Brand Architecture & Strategy",
      "Visual Identity Systems",
      "Market Positioning",
      "Brand Voice & Messaging"
    ],
    icon: Sparkles,
    bgClass: "bg-gradient-to-br from-purple-50 to-indigo-50",
    accentColor: "text-indigo-600",
    buttonColor: "bg-indigo-600 hover:bg-indigo-700",
    stats: {
      value: "250+",
      label: "Brands Transformed"
    }
  },
  {
    title: "Digital Experience Design",
    description: "Craft extraordinary digital experiences that merge cutting-edge technology with human-centered design principles.",
    features: [
      "Custom Web Applications",
      "E-commerce Platforms",
      "Progressive Web Apps",
      "Design Systems"
    ],
    icon: Code,
    bgClass: "bg-gradient-to-br from-blue-50 to-cyan-50",
    accentColor: "text-blue-600",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    stats: {
      value: "98%",
      label: "Client Satisfaction"
    }
  },
  {
    title: "Growth Marketing",
    description: "Drive exponential growth through integrated marketing strategies that leverage data, creativity, and emerging technologies.",
    features: [
      "Performance Marketing",
      "Marketing Automation",
      "Conversion Optimization",
      "Analytics & Insights"
    ],
    icon: TrendingUp,
    bgClass: "bg-gradient-to-br from-green-50 to-emerald-50",
    accentColor: "text-emerald-600",
    buttonColor: "bg-emerald-600 hover:bg-emerald-700",
    stats: {
      value: "10x",
      label: "Average ROI"
    }
  },
  {
    title: "Content & Storytelling",
    description: "Create compelling narratives and immersive content that builds lasting connections with your target audience.",
    features: [
      "Content Strategy",
      "Video Production",
      "Motion Design",
      "Social Storytelling"
    ],
    icon: Video,
    bgClass: "bg-gradient-to-br from-orange-50 to-rose-50",
    accentColor: "text-rose-600",
    buttonColor: "bg-rose-600 hover:bg-rose-700",
    stats: {
      value: "500M+",
      label: "Content Views"
    }
  }
]

const testimonials = [
  {
    quote: "They transformed our digital presence and doubled our conversion rate within months.",
    author: "Sarah Chen",
    role: "CEO, TechVision",
    image: "/api/placeholder/64/64"
  },
  {
    quote: "The most innovative agency we've worked with. Their strategic approach is unmatched.",
    author: "Michael Ross",
    role: "CMO, GrowthCo",
    image: "/api/placeholder/64/64"
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

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className={`group p-8 md:p-12 rounded-3xl ${service.bgClass} hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className={`p-4 rounded-2xl ${service.bgClass} shadow-lg`}>
            <service.icon className={`w-8 h-8 ${service.accentColor}`} />
          </div>
          <motion.div
            whileHover={{ rotate: 45 }}
            className={`${service.accentColor}`}
          >
            <ArrowUpRight className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Content */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h2>
        <p className="text-gray-600 mb-8 text-lg">{service.description}</p>

        {/* Features */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-1.5 h-1.5 rounded-full ${service.accentColor.replace('text-', 'bg-')}`} />
              <span className="text-sm md:text-base text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-8 p-4 bg-white/50 rounded-2xl backdrop-blur-sm">
          <div className={`${service.accentColor} text-3xl font-bold`}>
            {service.stats.value}
          </div>
          <div className="text-sm text-gray-600">{service.stats.label}</div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button 
            className={`w-full sm:w-auto ${service.buttonColor} text-white`}
          >
            Explore Service
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto border-gray-200 hover:bg-white/50"
          >
            View Case Studies
          </Button>
        </div>
      </div>
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
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg">
                  Start Your Project
                </Button>
                <Button variant="outline" className="border-gray-200 px-8 py-6 text-lg">
                  View Our Work
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </ParallaxSection>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg"
            >
              <p className="text-xl text-gray-700 mb-6">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}