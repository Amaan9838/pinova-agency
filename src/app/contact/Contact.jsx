'use client'

import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { Send, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react'

const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => {
      const width = document.documentElement.clientWidth;
      setIsMobile(width <= 768);
    };
    checkMobile();
    const resizeObserver = new ResizeObserver(checkMobile);
    resizeObserver.observe(document.documentElement);
    return () => resizeObserver.disconnect();
  }, []);

  return isMobile;
};

const ContactWrapper = styled.div`
  min-height: 90vh;
  overflow: hidden;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    min-height: auto;
    padding: 0 0.5rem;
  }
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  max-width: 1440px;
  margin: 0 auto;
  padding: 8rem 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 4rem 1.5rem;
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const FormField = styled(motion.div)`
  position: relative;
  margin-bottom: 2rem;
  
  input, textarea {
    width: 100%;
    padding: 1.25rem;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    font-size: clamp(0.875rem, 1.1vw, 1.1rem);
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      background: white;
      border-color: #5E43FF;
      box-shadow: 0 0 0 4px rgba(94, 67, 255, 0.1);
    }
  }
  
  textarea {
    height: 150px;
    resize: none;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    
    input, textarea {
      padding: 1rem;
    }
  }
`

const GradientButton = styled(motion.button)`
  background: linear-gradient(45deg, #5E43FF, #FF43E8);
  color: white;
  padding: clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 3rem);
  border-radius: 100px;
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  position: relative;
  width: 100%;
  justify-content: center;
  
  @media (min-width: 768px) {
    width: auto;
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, #FF43E8, #5E43FF);
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover::before {
    opacity: 1;
  }
`

const InfoCard = styled(motion.div)`
  background: white;
  padding: clamp(1.5rem, 2vw, 2rem);
  border-radius: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  .icon {
    background: #5E43FF;
    padding: clamp(0.75rem, 1vw, 1rem);
    border-radius: 1rem;
    color: white;
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem;
    gap: 1rem;
    
    h3 {
      font-size: 1.1rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  })
  
  const [status, setStatus] = useState('')
  const sectionRef = useRef(null)
  const isMobile = useScreenSize();

  useEffect(() => {
    const section = sectionRef.current

    if (!isMobile) {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center center",
          scrub: 1,
        },
        width: "92%",
        marginLeft: "60px",
        borderRadius: "60px",
        y: 100,
        opacity: 0.8,
      })

      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center center",
          scrub: 1,
        },
        width: "100%",
        borderRadius: "80px",
        marginLeft: "-1px",
        y: 0,
        opacity: 1,
      })
    }
  }, [isMobile])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: '0af8ea4a-660e-463d-afcb-fcaab95caf70',
          ...formData
        })
      })
      
      const result = await response.json()
      if (result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', project: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <>
      <ContactWrapper>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto pt-28 md:pt-32 pb-8 md:pb-16 px-4"
        >
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold text-center mb-8"
          >
            Let's Create
            <span className="text-[#5E43FF]"> Something</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5E43FF] to-[#FF43E8]">
              Extraordinary
            </span>
          </motion.h1>

          <ContactGrid>
            <div className="space-y-4 md:space-y-8">
              <InfoCard
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="icon">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1">Call Us</h3>
                  <p className="text-gray-600">+91 (926) 661-2906</p>
                </div>
              </InfoCard>

              <InfoCard
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="icon">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1">Email Us</h3>
                  <p className="text-gray-600">hello@pinova.in</p>
                </div>
              </InfoCard>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onSubmit={handleSubmit}
              className="bg-white p-4 md:p-8 rounded-2xl shadow-xl"
            >
              <FormField>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </FormField>

              <FormField>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </FormField>

              <FormField>
                <input
                  type="text"
                  placeholder="Project Type"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  required
                />
              </FormField>

              <FormField>
                <textarea
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </FormField>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 text-green-600 p-4 rounded-lg mb-6"
                >
                  Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-600 p-4 rounded-lg mb-6"
                >
                  Something went wrong. Please try again.
                </motion.div>
              )}

              <GradientButton
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      ◌
                    </motion.div>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <ArrowUpRight size={20} />
                  </span>
                )}
              </GradientButton>
            </motion.form>
          </ContactGrid>
        </motion.div>
      </ContactWrapper>

      <div ref={sectionRef} className="w-full min-h-[300px] md:min-h-[400px] bg-[#5E43FF] rounded-[30px] md:rounded-[60px] flex flex-col items-center px-4 md:px-6 py-12 md:py-24 text-white">
        <div className="text-center space-y-4 md:space-y-6 max-w-6xl">
          <h2 className="text-2xl sm:text-4xl md:text-[6rem] md:leading-[6.5rem] font-bold leading-tight">
            You can also contact us by email 
            <span className="inline-block mx-2 transform translate-y-2">
              📩
            </span> 
            at the following address:
          </h2>
        </div>

        <div className="mt-6 md:mt-8">
          <a 
            href="mailto:support@pinova.in"
            className="inline-flex items-center bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full text-lg md:text-xl hover:opacity-90 transition-opacity"
          >
            support@pinova.in
            <svg 
              className="ml-2 w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}