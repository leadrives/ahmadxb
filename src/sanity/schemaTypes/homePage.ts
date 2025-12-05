import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal label for the page',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
    }),
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'aboutSection',
      description: 'About section (to be defined later)',
    }),
    defineField({
      name: 'decision',
      title: 'Decision Section',
      type: 'decisionSection',
      description: 'Section 3 (to be defined later)',
    }),
    defineField({
      name: 'concerns',
      title: 'Concerns Section',
      type: 'concernsSection',
      description: 'Concerns/accordion section (to be defined later)',
    }),
    defineField({
      name: 'lifestyle',
      title: 'Lifestyle Section',
      type: 'lifestyleSection',
      description: 'Section 5 (to be defined later)',
    }),
    defineField({
      name: 'journey',
      title: 'Journey Section',
      type: 'journeySection',
      description: 'Section 6 (to be defined later)',
    }),
    defineField({
      name: 'servicesSection',
      title: 'Services Section',
      type: 'servicesSection',
    }),
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'testimonialsSection',
    }),
    defineField({
      name: 'visaSection',
      title: 'Visa Section',
      type: 'visaSection',
      description: 'Golden visa & fly-in section (to be defined later)',
    }),
    defineField({
      name: 'contactSection',
      title: 'Contact Section',
      type: 'contactSection',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
