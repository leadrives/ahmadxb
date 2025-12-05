import { defineType, defineField } from 'sanity'

// Initial minimal version - can be expanded later with golden visa & fly-in specific fields
export default defineType({
  name: 'visaSection',
  title: 'Visa Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
    }),
  ],
})
