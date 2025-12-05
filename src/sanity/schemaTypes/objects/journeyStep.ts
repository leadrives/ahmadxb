import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'journeyStep',
  title: 'Journey Step',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      description: 'Step number, e.g. "01", "02", "03"',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Step title',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      description: 'Step description',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Sort order (lower numbers first)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'body',
      number: 'number',
      order: 'order',
    },
    prepare({ title, subtitle, number, order }) {
      return {
        title: `${number || order || '?'}. ${title}`,
        subtitle: subtitle ? `${subtitle.slice(0, 60)}...` : '',
      }
    },
  },
})