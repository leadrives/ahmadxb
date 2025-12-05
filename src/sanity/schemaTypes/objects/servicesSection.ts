import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Section title, e.g. "Services"',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      description: 'Bottom CTA, e.g. "Book Free Discovery Call"',
    }),
    defineField({
      name: 'items',
      title: 'Service Items',
      type: 'array',
      of: [{ type: 'serviceItem' }],
      description: 'List of services',
    }),
  ],
})
