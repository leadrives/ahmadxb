import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'journeySection',
  title: 'Journey Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Section title, e.g. "How the journey works"',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Small text under the title',
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Portrait image shown on the left',
    }),
    defineField({
      name: 'steps',
      title: 'Journey Steps',
      type: 'array',
      of: [{ type: 'journeyStep' }],
      description: 'List of numbered steps',
    }),
  ],
})
