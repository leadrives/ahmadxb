import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'decisionSection',
  title: 'Decision Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Full main title, e.g. "Building your future with every decision…"',
    }),
    defineField({
      name: 'accentWord',
      title: 'Accent Word',
      type: 'string',
      description: 'Word to style differently, e.g. "decision…"',
    }),
    defineField({
      name: 'imageNumber',
      title: 'Image Number',
      type: 'string',
      description: 'Number to display, e.g. "04"',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'The broken plate image',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Subtitle text, e.g. "yet something still missing?"',
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 3,
      description: 'Note text about being one decision away from a stronger future',
    }),
    defineField({
      name: 'desktopCtaLabel',
      title: 'Desktop CTA Label',
      type: 'string',
      description: 'Desktop CTA button text, e.g. "Book a Session"',
    }),
    defineField({
      name: 'mobileCtaLabel',
      title: 'Mobile CTA Label',
      type: 'string',
      description: 'Mobile CTA button text, e.g. "Book Free Discovery Call"',
    }),
  ],
})
