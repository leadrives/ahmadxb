import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'concernsSection',
  title: 'Concerns Section',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'The sunflower / butterfly image shown on the left',
    }),
    defineField({
      name: 'items',
      title: 'Concern Items',
      type: 'array',
      of: [{ type: 'concernItem' }],
      description: 'All accordion items',
    }),
  ],
})
