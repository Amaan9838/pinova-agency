'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import Image from 'next/image'

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { title: "Services", href: "#" },
    { title: "Projects", href: "#" },
    { title: "Process", href: "#" },
    { title: "About", href: "#" },
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
    <Nav className={`${isOpen ? 'h-screen' : ''}`}  style={{ 
      position: 'fixed ',
      boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none'
    }}>
      {/* Desktop Navigation */}
      <DesktopNav>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Image src="/transparent-logo.png" width={140} height={40} alt="Logo" />
        </motion.div>

        <DesktopMenu>
          {menuItems.map((item, i) => (
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
              {menuItems.map((item, i) => (
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
              <div className="text-white/60 text-sm">Instagram</div>
              <div className="text-white/60 text-sm">Twitter</div>
              <div className="text-white/60 text-sm">LinkedIn</div>
            </motion.div>
          </MobileNav>
        )}
      </AnimatePresence>
    </Nav>
  )
}
