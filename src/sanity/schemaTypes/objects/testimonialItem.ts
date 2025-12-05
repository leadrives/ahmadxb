import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonialItem',
  title: 'Testimonial Item',
  type: 'object',
  fields: [
    defineField({
      name: 'avatar',
      title: 'Client Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Client photo',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      description: 'Testimonial text',
    }),
    defineField({
      name: 'signature',
      title: 'Signature',
      type: 'string',
      description: 'e.g. "— Ahmed & Rasha"',
    }),
  ],
  preview: {
    select: {
      title: 'signature',
      subtitle: 'quote',
      media: 'avatar',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `"${subtitle.slice(0, 60)}..."` : '',
        media,
      }
    },
  },
})
