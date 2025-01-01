import React from 'react';
import { Code, CheckCheck, Brain, Smartphone, LayoutDashboard, ServerCog } from 'lucide-react';

const FullStackServices = () => {
    const services = [
        {
          icon: <Code className="w-8 h-8 text-orange-500" />,
          title: <>Custom Software<br/>Development</>,
          description: "Create custom software tailored for your unique needs, including front-end, and core back-end technology.",
        },
        {
          icon: <CheckCheck className="w-8 h-8 text-yellow-500" />,
          title: <>QA and<br/>Testing</>,
          description: "Make your technology bulletproof, with manual and automated testing.",
        },
        {
          icon: <Brain className="w-8 h-8 text-blue-500" />,
          title: <>AI and<br/>Data Science</>,
          description: "Use leading AI, machine learning, and data engineering technologies to unlock business value.",
        },
        {
          icon: <Smartphone className="w-8 h-8 text-orange-500" />,
          title: <>Mobile App<br/>Development</>,
          description: "Build performant, scalable, and secure mobile applications for iOS and Android devices.",
        },
        {
          icon: <LayoutDashboard className="w-8 h-8 text-emerald-500" />,
          title: <>UX/UI<br/>Design</>,
          description: "Create beautiful, pixel-perfect, and easy-to-use designs that delight your end users.",
        },
        {
          icon: <ServerCog className="w-8 h-8 text-orange-400" />,
          title: <>Platform and<br/>Infrastructure</>,
          description: "Ensure applications are secure, fault tolerant and highly available with our DevOps and Security engineers.",
        },
    ];
    

  return (
    <div className=" mx-auto px-4 py-16 sm:px-6 lg:px-24">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">
          From Concept to Completion:
          <br />
          Our Full-Stack Expertise<span className="text-[#5E43FF]">.</span>
        </h1>
        <div className="flex justify-end">
          <a href="/services" className="inline-flex items-center text-sm font-medium">
            Everything we do
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className='space-y-2'>
            <div className='mb-2'>
              {service.icon}
            </div>
            <h3 className="services-headings md:text-3xl text-2xl font-medium ">{service.title}</h3>
            <p className="font-normal text-lg">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullStackServices;