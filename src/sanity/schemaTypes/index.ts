import { type SchemaTypeDefinition } from 'sanity'

// Document types
import homePage from './homePage'
import contactSubmission from './documents/contactSubmission'

// Object types
import heroSection from './objects/heroSection'
import aboutSection from './objects/aboutSection'
import decisionSection from './objects/decisionSection'
import concernsSection from './objects/concernsSection'
import concernItem from './objects/concernItem'
import factItem from './objects/factItem'
import lifestyleSection from './objects/lifestyleSection'
import journeySection from './objects/journeySection'
import journeyStep from './objects/journeyStep'
import servicesSection from './objects/servicesSection'
import serviceItem from './objects/serviceItem'
import testimonialsSection from './objects/testimonialsSection'
import testimonialItem from './objects/testimonialItem'
import visaSection from './objects/visaSection'
import contactSection from './objects/contactSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Document types
    homePage,
    contactSubmission,
    
    // Object types
    heroSection,
    aboutSection,
    decisionSection,
    concernsSection,
    concernItem,
    factItem,
    lifestyleSection,
    journeySection,
    journeyStep,
    servicesSection,
    serviceItem,
    testimonialsSection,
    testimonialItem,
    visaSection,
    contactSection,
  ],
}
