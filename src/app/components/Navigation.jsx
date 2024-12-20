'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  z-index: 100;
  mix-blend-mode: difference;
`

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  color: white;
`

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Nav className={isScrolled ? 'backdrop-blur-sm bg-black/50' : ''}>
      <NavContent>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold"
        >
          InProgress
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cursor-pointer"
        >
          Menu
        </motion.div>
      </NavContent>
    </Nav>
  )
}
