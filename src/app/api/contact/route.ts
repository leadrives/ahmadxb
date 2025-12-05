import { NextRequest, NextResponse } from 'next/server'
import { serverClient } from '../../../lib/sanity.server'

// Function to get IP address from request
function getClientIP(request: NextRequest): string {
  // Check various headers for the real IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  // Fallback to unknown if no IP headers are available
  return 'unknown'
}

// Function to get country from IP address
async function getCountryFromIP(ip: string): Promise<string> {
  try {
    // Skip for localhost/development
    if (ip === 'unknown' || ip.includes('127.0.0.1') || ip.includes('::1') || ip.includes('localhost')) {
      return 'Development'
    }
    
    // Use ipapi.co for country detection (free tier available)
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Mohamad-Portfolio/1.0)'
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      return data.country_name || 'Unknown'
    }
    
    return 'Unknown'
  } catch (error) {
    console.error('Error fetching country:', error)
    return 'Unknown'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, message } = body

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: firstName, lastName, email, and message are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if Sanity token is configured
    if (!process.env.SANITY_WRITE_TOKEN || 
        process.env.SANITY_WRITE_TOKEN === 'your_sanity_write_token_here' || 
        process.env.SANITY_WRITE_TOKEN === 'sk_test_or_sk_prod_YOUR_ACTUAL_TOKEN_HERE') {
      console.log('Contact form submission (token not configured):', {
        firstName,
        lastName,
        email,
        phone,
        message,
        timestamp: new Date().toISOString()
      })
      
      return NextResponse.json({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.',
      })
    }

    // Get IP address and country
    const ipAddress = getClientIP(request)
    const country = await getCountryFromIP(ipAddress)

    let submission: any = null

    try {
      // Create the contact submission document in Sanity
      submission = await serverClient.create({
        _type: 'contactSubmission',
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || '',
        message: message.trim(),
        ipAddress,
        country,
        submittedAt: new Date().toISOString(),
        status: 'new'
      })

      console.log('Contact submission created:', submission._id, 'from IP:', ipAddress, 'Country:', country)
      
      return NextResponse.json({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.',
        submissionId: submission._id 
      })
      
    } catch (sanityError: any) {
      // Handle Sanity-specific errors (token issues, etc.)
      console.error('Sanity error:', sanityError)
      
      // For unauthorized errors, fall back to console logging
      if (sanityError.statusCode === 401 || sanityError.message?.includes('Unauthorized')) {
        console.log('Contact form submission (Sanity unauthorized - logging to console):', {
          firstName,
          lastName,
          email,
          phone,
          message,
          ipAddress,
          country,
          timestamp: new Date().toISOString()
        })
        
        return NextResponse.json({ 
          success: true, 
          message: 'Thank you for your message! We will get back to you soon.',
        })
      }
      
      // Re-throw other Sanity errors
      throw sanityError
    }

  } catch (error) {
    console.error('Error creating contact submission:', error)
    
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form. Please try again later.' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit contact form.' },
    { status: 405 }
  )
}