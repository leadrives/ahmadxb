import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'About Section (Section 2)',
  type: 'object',
  fields: [
    defineField({
      name: 'mainTitle',
      title: 'Main Title',
      type: 'string',
      description: 'e.g. "Elite, Award Winning Agent"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Brief description under main title',
    }),
    defineField({
      name: 'facts',
      title: 'Fact Items',
      type: 'array',
      of: [{ type: 'factItem' }],
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'bioTitle',
      title: 'Bio Title',
      type: 'string',
      description: 'e.g. "Hi, I\'m Ahmad"',
    }),
    defineField({
      name: 'bioText',
      title: 'Bio Text',
      type: 'text',
      rows: 4,
      description: 'Personal bio paragraph',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      description: 'e.g. "Book Free Discovery Call"',
    }),
    defineField({
      name: 'bioImage',
      title: 'Bio Portrait Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'signature',
      title: 'Signature Text',
      type: 'string',
      description: 'e.g. "M Ahmad"',
    }),
  ],
})
