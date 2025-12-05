import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main hero heading, e.g. "Create a life that feels like you"',
    }),
    defineField({
      name: 'statText',
      title: 'Stat Text',
      type: 'text',
      rows: 2,
      description: 'The stat line below the avatars, e.g. "$350M+ in Dubai real estate closed • Multiple-time Emaar & DAMAC award winner"',
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
      rows: 4,
      description: 'Hero paragraph text',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      description: 'Main hero button label, e.g. "Book Free Discovery Call"',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main hero portrait image',
    }),
    defineField({
      name: 'avatars',
      title: 'Avatar Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'The 3 small avatar images used in the hero stats row',
      validation: (Rule) => Rule.max(3),
    }),
  ],
})
