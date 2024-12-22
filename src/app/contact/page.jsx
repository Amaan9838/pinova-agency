'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { Send, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react'

const ContactWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(45deg, #f6f6f6, #ffffff);
  overflow: hidden;
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
    padding: 4rem 2rem;
  }
`

const FormField = styled(motion.div)`
  position: relative;
  margin-bottom: 2rem;
  
  input, textarea {
    width: 100%;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    font-size: 1.1rem;
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
`

const GradientButton = styled(motion.button)`
  background: linear-gradient(45deg, #5E43FF, #FF43E8);
  color: white;
  padding: 1.5rem 3rem;
  border-radius: 100px;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  position: relative;
  
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
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  .icon {
    background: #5E43FF;
    padding: 1rem;
    border-radius: 1rem;
    color: white;
  }
`

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Google Forms integration
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdYNt6Zwnr6qReQAz3P1xn12PBPabU9ryXx-MvsesiHRey-MQ/viewform?usp=header'
    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData)
      })
      
      // Success animation
      setIsSubmitting(false)
      setFormData({ name: '', email: '', project: '', message: '' })
    } catch (error) {
      setIsSubmitting(false)
    }
  }

  return (
    <ContactWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto pt-32 pb-16 px-4"
      >
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-8xl font-bold text-center mb-8"
        >
          Let's Create
          <span className="text-[#5E43FF]"> Something</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5E43FF] to-[#FF43E8]">
            Extraordinary
          </span>
        </motion.h1>

        <ContactGrid>
          <div className="space-y-8">
            <InfoCard
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="icon">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Call Us</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </InfoCard>

            <InfoCard
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="icon">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Email Us</h3>
                <p className="text-gray-600">hello@designcompany.com</p>
              </div>
            </InfoCard>

            <InfoCard
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="icon">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Visit Us</h3>
                <p className="text-gray-600">123 Design Street, Creative City</p>
              </div>
            </InfoCard>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-xl"
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

            <GradientButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <ArrowUpRight size={24} />
            </GradientButton>
          </motion.form>
        </ContactGrid>
      </motion.div>
    </ContactWrapper>
  )
}
