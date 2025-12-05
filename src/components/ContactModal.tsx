import { useState, useEffect } from 'react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  countryCode: string
  phone: string
  message: string
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

interface Country {
  name: string
  code: string
  dialCode: string
  flag: string
}

// Popular countries with their dial codes and flags
const countries: Country[] = [
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: '🇦🇪' },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧' },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '+966', flag: '🇸🇦' },
  { name: 'Qatar', code: 'QA', dialCode: '+974', flag: '🇶🇦' },
  { name: 'Kuwait', code: 'KW', dialCode: '+965', flag: '🇰🇼' },
  { name: 'Bahrain', code: 'BH', dialCode: '+973', flag: '🇧🇭' },
  { name: 'Oman', code: 'OM', dialCode: '+968', flag: '🇴🇲' },
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳' },
  { name: 'Pakistan', code: 'PK', dialCode: '+92', flag: '🇵🇰' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺' },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪' },
  { name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷' },
  { name: 'Netherlands', code: 'NL', dialCode: '+31', flag: '🇳🇱' },
  { name: 'Switzerland', code: 'CH', dialCode: '+41', flag: '🇨🇭' },
  { name: 'Singapore', code: 'SG', dialCode: '+65', flag: '🇸🇬' },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '🇿🇦' },
  { name: 'Russia', code: 'RU', dialCode: '+7', flag: '🇷🇺' },
  { name: 'China', code: 'CN', dialCode: '+86', flag: '🇨🇳' },
]

// Function to detect country from IP
const getCountryFromIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return data.country_code || 'AE'
  } catch (error) {
    return 'AE' // Default to UAE
  }
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+971',
    phone: '',
    message: ''
  })

  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  })

  // Initialize country based on IP
  useEffect(() => {
    const initializeCountry = async () => {
      const countryCode = await getCountryFromIP()
      const country = countries.find(c => c.code === countryCode) || countries[0]
      setSelectedCountry(country)
      setFormData(prev => ({ ...prev, countryCode: country.dialCode }))
    }
    
    if (isOpen) {
      initializeCountry()
    }
  }, [isOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector('.dropdown')
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setShowCountryDropdown(false)
      }
    }

    if (showCountryDropdown) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showCountryDropdown])

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setFormData(prev => ({ ...prev, countryCode: country.dialCode }))
    setShowCountryDropdown(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setStatus({ type: 'loading', message: 'Sending your message...' })

    try {
      // Combine country code with phone number for submission
      const submissionData = {
        ...formData,
        phone: formData.phone ? `${formData.countryCode}${formData.phone.replace(/^[\+\s\-\(\)]*/, '')}` : ''
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (result.success) {
        setStatus({ 
          type: 'success', 
          message: result.message || 'Thank you! Your message has been sent successfully.' 
        })
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          countryCode: selectedCountry.dialCode,
          phone: '',
          message: ''
        })

        // Auto close modal after 2 seconds on success
        setTimeout(() => {
          onClose()
          setStatus({ type: 'idle', message: '' })
        }, 2000)

      } else {
        setStatus({ 
          type: 'error', 
          message: result.error || 'Something went wrong. Please try again.' 
        })
      }

    } catch (error) {
      console.error('Contact form error:', error)
      setStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      })
    }
  }

  const handleModalClose = () => {
    if (status.type !== 'loading') {
      onClose()
      // Reset status when closing
      setTimeout(() => {
        setStatus({ type: 'idle', message: '' })
      }, 300)
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="modal fade show d-block" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && handleModalClose()}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: 'var(--bg-main)' }}>
          <div className="modal-header border-0 pb-0" style={{ 
            backgroundColor: 'var(--bg-main)',
            borderBottom: '1px solid var(--accent-light)' 
          }}>
            <h5 className="modal-title fw-bold" style={{ color: 'var(--text-dark)' }}>
              Get In Touch
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleModalClose}
              disabled={status.type === 'loading'}
              style={{ filter: 'invert(0.2)' }}
            ></button>
          </div>

          <div className="modal-body pt-2" style={{ 
            backgroundColor: 'var(--bg-main)', 
            color: 'var(--text-dark)' 
          }}>
            {status.message && (
              <div className={`alert ${
                status.type === 'success' ? 'alert-success' : 
                status.type === 'error' ? 'alert-danger' : 
                'alert-info'
              } mb-3`}>
                <div className="d-flex align-items-center">
                  {status.type === 'loading' && (
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  {status.message}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="modal-firstName" className="form-label fw-semibold">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="modal-firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    disabled={status.type === 'loading'}
                    placeholder="Your first name"
                    style={{
                      backgroundColor: 'var(--bg-main)',
                      borderColor: 'var(--accent-light)',
                      color: 'var(--text-dark)'
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="modal-lastName" className="form-label fw-semibold">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="modal-lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    disabled={status.type === 'loading'}
                    placeholder="Your last name"
                    style={{
                      backgroundColor: 'var(--bg-main)',
                      borderColor: 'var(--accent-light)',
                      color: 'var(--text-dark)'
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="modal-email" className="form-label fw-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="modal-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={status.type === 'loading'}
                    placeholder="your.email@example.com"
                    style={{
                      backgroundColor: 'var(--bg-main)',
                      borderColor: 'var(--accent-light)',
                      color: 'var(--text-dark)'
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="modal-phone" className="form-label fw-semibold">
                    Phone Number
                  </label>
                  <div className="input-group">
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        disabled={status.type === 'loading'}
                        style={{
                          backgroundColor: 'var(--bg-main)',
                          borderColor: 'var(--accent-light)',
                          color: 'var(--text-dark)',
                          minWidth: '120px'
                        }}
                      >
                        <span className="me-2">{selectedCountry.flag}</span>
                        <span>{selectedCountry.dialCode}</span>
                      </button>
                      {showCountryDropdown && (
                        <div className="dropdown-menu show position-absolute" 
                             style={{ 
                               maxHeight: '200px', 
                               overflowY: 'auto',
                               backgroundColor: 'var(--bg-main)',
                               border: '1px solid var(--accent-light)',
                               zIndex: 1050
                             }}>
                          {countries.map((country) => (
                            <button
                              key={country.code}
                              className="dropdown-item d-flex align-items-center"
                              onClick={() => {
                                setSelectedCountry(country)
                                setFormData(prev => ({ ...prev, countryCode: country.dialCode }))
                                setShowCountryDropdown(false)
                              }}
                              style={{
                                color: 'var(--text-dark)',
                                backgroundColor: selectedCountry.code === country.code ? 'var(--accent-light)' : 'transparent'
                              }}
                            >
                              <span className="me-2">{country.flag}</span>
                              <span className="me-2">{country.name}</span>
                              <span className="text-muted small">{country.dialCode}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      className="form-control"
                      id="modal-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={status.type === 'loading'}
                      placeholder="Enter phone number"
                      style={{
                        backgroundColor: 'var(--bg-main)',
                        borderColor: 'var(--accent-light)',
                        color: 'var(--text-dark)'
                      }}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="modal-message" className="form-label fw-semibold">
                    Message *
                  </label>
                  <textarea
                    className="form-control"
                    id="modal-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={status.type === 'loading'}
                    placeholder="Tell us about your project or how we can help you..."
                    style={{
                      backgroundColor: 'var(--bg-main)',
                      borderColor: 'var(--accent-light)',
                      color: 'var(--text-dark)'
                    }}
                  ></textarea>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={status.type === 'loading'}
                    style={{
                      backgroundColor: 'var(--text-dark)',
                      borderColor: 'var(--text-dark)',
                      color: 'var(--bg-main)',
                      padding: '12px',
                      fontWeight: '600',
                      fontSize: '16px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--accent-light)'
                      e.currentTarget.style.borderColor = 'var(--accent-light)'
                      e.currentTarget.style.color = 'var(--text-dark)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--text-dark)'
                      e.currentTarget.style.borderColor = 'var(--text-dark)'
                      e.currentTarget.style.color = 'var(--bg-main)'
                    }}
                  >
                    {status.type === 'loading' ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}