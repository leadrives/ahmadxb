import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'factItem',
  title: 'Fact Item',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      description: 'e.g. "01", "02", "03"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Bold Title',
      type: 'string',
      description: 'The bold heading text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'The detailed description text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used for sorting (1, 2, 3, etc.)',
      validation: (Rule) => Rule.integer().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'number',
      description: 'description',
    },
    prepare(selection) {
      const { title, subtitle, description } = selection
      return {
        title: title,
        subtitle: `#${subtitle}`,
        media: null,
      }
    },
  },
})