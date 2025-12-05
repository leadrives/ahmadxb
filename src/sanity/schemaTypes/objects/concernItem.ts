import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'concernItem',
  title: 'Concern Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'isDefaultOpen',
      title: 'Open by default?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'body',
      order: 'order',
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${order || '?'}. ${title}`,
        subtitle: subtitle ? `${subtitle.slice(0, 60)}...` : '',
      }
    },
  },
})