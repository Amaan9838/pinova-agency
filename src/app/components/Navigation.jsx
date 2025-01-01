'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import { Instagram, Facebook, Linkedin, Twitter, Phone } from 'lucide-react'
// Add GSAP import at the top
import gsap from 'gsap'

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/pinovastudio/", label: "Instagram" },
  { icon: Facebook, href: "https://bitly.cx/iiXR", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  {icon: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),  href: "https://x.com/pinovastudio", label: "X" },
  {  icon: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ), href: "https://wa.me/919266612906", label: "WhatsApp" }
]
const Nav = styled.nav`
  width: 100%;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  
`

const DesktopNav = styled.div`
  display: none;
  padding: 1.5rem 8rem;
  
  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const DesktopMenu = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
`

const MenuLink = styled(motion.div)`
  position: relative;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 2px;
    background: #5E43FF;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`

const MobileNav = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  z-index: 50;
  
  @media (min-width: 1024px) {
    display: none;
  }
`

const MenuButton = styled.button`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #5E43FF;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
  
  @media (min-width: 1024px) {
    display: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: linear-gradient(45deg, #5E43FF, #FF43E8);
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover::before {
    opacity: 1;
  }
`

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)


// Inside Navigation component, add navRef
const navRef = useRef(null)

useEffect(() => {
  const handleScroll = () => {
    const heroSection = document.querySelector('section')
    if (heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
      const currentScroll = window.scrollY
      
      if (currentScroll > heroBottom) {
        // Animate navbar sliding up
        gsap.to(navRef.current, {
          yPercent: -100,
          duration: 0.1,
          ease: "power2.inOut"
        })
      } else {
        // Animate navbar sliding back down
        gsap.to(navRef.current, {
          yPercent: 0,
          duration: 0.1,
          ease: "power2.inOut"
        })
      }

      setIsScrolled(currentScroll > 35 && currentScroll < heroBottom)
    }
  }
  
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])


  const desktopMenuItems = [
    { title: "Services", href: "/services" },
    { title: "How We Work", href: "/how-we-work" },
    { title: "Blog", href: "/blog" },

  ]
  
  const mobileMenuItems = [
    { title: "Services", href: "/services" },
    { title: "How We Work", href: "/how-we-work" },
    { title: "Blog", href: "/blog" },
    { title: "Contact Us", href: "/contact" }
  ]

  const menuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  }

  return (
    <Nav 
    ref={navRef}
    className={`${isOpen ? 'h-screen' : ''}`}  
    style={{ 
      position: 'fixed',
      boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none',
      top: 0
    }}
  >
  
  
      {/* Desktop Navigation */}
      <DesktopNav>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
       <Link href={"/"}>   <Image src="/transparent-logo.png" width={140} height={40} alt="Logo" /></Link>
        </motion.div>

        <DesktopMenu>
          {desktopMenuItems.map((item, i) => (
             <Link href={item.href} key={`desktop-${item.title}`}>
  
            <MenuLink
              
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-gray-800 hover:text-gray-600"
            >
              {item.title}
            </MenuLink>
            </Link>
))}
          
          <Link href="/contact">
  <motion.button
    className="hidden lg:block bg-black text-white px-8 py-4 text-lg rounded-full hover:bg-gray-800 transition-colors"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    Contact Us
  </motion.button>
</Link>
        </DesktopMenu>
      </DesktopNav>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex justify-between items-center px-6 py-4">
        <Image src="/logo.png" width={120} height={40} alt="Logo" className="z-60" />
        
        <MenuButton onClick={() => setIsOpen(!isOpen)}>
          <Menu 
            className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} 
            size={24} 
            color="white"
          />
        </MenuButton>
      </div>

      <AnimatePresence>
        {isOpen && (
          <MobileNav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="h-full flex flex-col justify-center items-center gap-12">
              {mobileMenuItems.map((item, i) => (
                <Link href={item.href} key={`mobile-${item.title}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: i * 0.1,
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1]
                    }
                  }}
                  className="text-3xl font-bold text-white hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </motion.div>
              </Link>
              ))}
            </div>
            
            <motion.div 
              className="absolute bottom-12 left-0 w-full flex justify-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
               {socialLinks.map((social, index) => (
      <motion.a
        key={index}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 hover:text-white transition-all duration-300"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 0.6 + index * 0.1 }
        }}
      >
        <social.icon size={24} />
      </motion.a>
    ))}            </motion.div>
          </MobileNav>
        )}
      </AnimatePresence>
    </Nav>
  )
}
