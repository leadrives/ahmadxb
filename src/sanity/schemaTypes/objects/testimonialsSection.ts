import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Testimonial Items',
      type: 'array',
      of: [{ type: 'testimonialItem' }],
      description: 'List of testimonials for the slider',
    }),
  ],
})
