'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { Menu, X } from 'lucide-react' // Import icons for mobile menu
import Image from 'next/image'

const Nav = styled.nav`
  width: 100%;
  z-index: 100;
`

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 2rem;
   
  @media (max-width: 1024px) {
    padding: 1.5rem;
  }
`

const CenterMenu = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 1024px) {
    display: none;
  }
`

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 1024px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    z-index: 50;
  }
`

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isFixed, setIsFixed] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    ScrollTrigger.create({
      trigger: 'section',
      start: 'top top',
      end: '+=2000',
      onUpdate: (self) => {
        // Lock navigation until the Hero animation completes
        if (self.progress >= 1) {
          setIsFixed(false)
        } else {
          setIsFixed(true)
        }
      }
    })
  }, [])

  return (
    <Nav style={{ position: isFixed ? 'fixed' : 'absolute' }} className={` px-4 bg-white lg:px-32 md:px-8`}>
      <NavContent>
        {/* Left - Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-[60]"
        >
          <Image src={"/logo.png"} width={200} height={200} alt="" srcSet="" className='w-24 md:w-36' />
        </motion.div>

        {/* Center - Menu Items */}
        <CenterMenu>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hover:text-gray-300 text-black text-lg font-medium transition-colors cursor-pointer"
          >
            Our Services
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hover:text-gray-300 text-black text-lg font-medium transition-colors cursor-pointer"
          >
            How it Works
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hover:text-gray-300 text-black text-lg font-medium transition-colors cursor-pointer"
          >
            Our Projects
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hover:text-gray-300 text-black text-lg font-medium transition-colors cursor-pointer"
          >
            Customer Reviews
          </motion.div>
        </CenterMenu>

        {/* Right - Contact Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:block bg-black text-white px-8 py-4 text-lg rounded-full hover:bg-gray-800 transition-colors"
        >
          Contact Us
        </motion.button>

        <button 
          className="block lg:hidden z-[60]" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} className=' text-white' /> : <Menu size={24} className='text-black'/>}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <MobileMenu>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-8 items-center text-white"
            >
              <a className="text-xl">Our Services</a>
              <a className="text-xl">How it Works</a>
              <a className="text-xl">Our Projects</a>
              <a className="text-xl">Customer Reviews</a>
              <button className="bg-white text-black px-6 py-3 rounded-full">
                Contact Us
              </button>
            </motion.div>
          </MobileMenu>
        )}
      </NavContent>
    </Nav>
  )
}
