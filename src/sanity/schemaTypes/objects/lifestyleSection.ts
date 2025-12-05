import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'lifestyleSection',
  title: 'Lifestyle Section (Section 5)',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the main heading, e.g. "THIS IS WHAT A SMART DUBAI PROPERTY INVESTMENT CAN GIVE YOU"',
    }),
    defineField({
      name: 'mainHeading',
      title: 'Main Heading',
      type: 'string',
      description: 'Complete main section title, e.g. "Imagine waking up to a luxury lifestyle that delivers huge ROI"',
    }),
    defineField({
      name: 'accentWords',
      title: 'Accent Words',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Words to highlight in the heading, e.g. ["luxury lifestyle", "huge ROI"]',
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Full-width background image for the section',
    }),
  ],
})
