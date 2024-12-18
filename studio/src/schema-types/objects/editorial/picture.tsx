import {defineField, defineType} from 'sanity'

export const picture = defineType({
  name: 'picture',
  title: 'Picture',
  type: 'image',
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessibility.',
      validation: (rule) => {
        // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
        return rule.custom((alt, context) => {
          if ((context.document?.picture as any)?.asset?._ref && !alt) {
            return 'Required'
          }
          return true
        })
      },
    }),
  ],
  options: {
    hotspot: true,
  },
  validation: (rule) => rule.required(),
})
