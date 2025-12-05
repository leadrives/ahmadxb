'use client'

import { useState } from 'react'
import ContactModal from './ContactModal'

interface ClientWrapperProps {
  children: React.ReactNode
  data: any // The homepage data from Sanity
}

export default function ClientWrapper({ children, data }: ClientWrapperProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const openContactModal = () => setIsContactModalOpen(true)
  const closeContactModal = () => setIsContactModalOpen(false)

  return (
    <div onClick={(e) => {
      const target = e.target as HTMLElement
      
      // Check if the clicked element should open the contact modal
      if (target.classList.contains('btn-hero-cta') || 
          target.classList.contains('section2-cta') ||
          target.classList.contains('section3-btn') ||
          target.classList.contains('section3-btn-mobile') ||
          target.classList.contains('section-7-cta-button') ||
          target.classList.contains('book-btn')) {
        e.preventDefault()
        openContactModal()
      }
    }}>
      {children}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={closeContactModal} 
      />
    </div>
  )
}