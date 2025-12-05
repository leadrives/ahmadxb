'use client'

import { useState } from 'react'
import ContactModal from '../../components/ContactModal'

interface ClientHomePageProps {
  children: React.ReactNode
}

export default function ClientHomePage({ children }: ClientHomePageProps) {
  const [showContactModal, setShowContactModal] = useState(false)

  const openContactModal = () => setShowContactModal(true)
  const closeContactModal = () => setShowContactModal(false)

  // Add event listener for CTA buttons
  const handleCTAClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (
      target.classList.contains('btn-hero-cta') ||
      target.classList.contains('section2-cta') ||
      target.classList.contains('section3-btn') ||
      target.classList.contains('section3-btn-mobile') ||
      target.classList.contains('section-7-cta-button') ||
      target.classList.contains('btn-contact')
    ) {
      e.preventDefault()
      openContactModal()
    }
  }

  return (
    <div onClick={handleCTAClick}>
      {children}
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal}
        onClose={closeContactModal}
      />
    </div>
  )
}