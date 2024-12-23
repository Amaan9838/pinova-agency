'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Lightbulb, Rocket, Settings, LineChart } from 'lucide-react';

const timelineSteps = [
  {
    title: "Discovery & Strategy",
    description: "We dive deep into your vision, analyzing market trends and defining clear objectives.",
    icon: <Lightbulb className="text-3xl text-amber-500" />,
    image: "https://illustrations.popsy.co/blue/keynote-presentation.svg"
  },
  {
    title: "Design & Planning",
    description: "Our creative team crafts stunning designs while developing a robust project roadmap.",
    icon: <Settings className="text-3xl text-emerald-500" />,
    image: "https://illustrations.popsy.co/blue/designer.svg"
  },
  {
    title: "Development & Implementation",
    description: "We bring your vision to life with cutting-edge technology and best practices.",
    icon: <Rocket className="text-3xl text-purple-500" />,
    image: "https://illustrations.popsy.co/blue/woman-with-a-laptop.svg"
  },
  {
    title: "Launch & Growth",
    description: "Your project goes live with our continued support for optimal performance.",
    icon: <LineChart className="text-3xl text-blue-500" />,
    image: "https://illustrations.popsy.co/blue/man-riding-a-rocket.svg"
  }
];

export default function HowWeWork() {
  return (
    <div className="min-h-screen py-24 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            How We Work
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Our proven process delivers exceptional results through a combination of strategy, creativity, and technical excellence.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line - hidden on mobile */}
        {/* Curly wave timeline */}
<div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full">
  <svg className="h-full" width="50" viewBox="0 0 50 1000" fill="none" preserveAspectRatio="none">
    <path 
      d="M 25,0 
         C 45,100 5,200 25,300
         C 45,400 5,500 25,600
         C 45,700 5,800 25,900
         C 45,950 25,1000 25,1000" 
      stroke="url(#gradient)" 
      strokeWidth="4" 
      fill="none"
    />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
  </svg>
</div>

          {timelineSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex flex-col md:flex-row items-center mb-12 md:mb-20 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`w-full md:w-1/2 px-4 ${index % 2 === 0 ? 'md:pr-20' : 'md:pl-20'} mb-8 md:mb-0`}>
                <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 transform hover:scale-105 transition-transform duration-300">
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>

              {/* Timeline dot - hidden on mobile */}
              <div className="hidden md:block w-12 h-12 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border-4 border-purple-500 z-10" />

              <div className={`w-full md:w-1/2 px-4 ${index % 2 === 0 ? 'md:pl-20' : 'md:pr-20'}`}>
                <div className="relative h-48 md:h-[32rem] rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    priority
                    style={{ objectFit: 'contain' }}
                    className="p-4 bg-white"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
