import { defineType, defineField } from 'sanity'

export const storeSchema = defineType({
  name: 'store',
  title: 'Store',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Store Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'neighborhood',
      title: 'Neighborhood',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'socialPosts',
      title: 'Social Posts (TikTok / Instagram)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string' }),
            defineField({ name: 'postUrl', title: 'Post URL', type: 'url' }),
            defineField({ name: 'embedHtml', title: 'Embed HTML', type: 'text' }),
            defineField({ name: 'authorHandle', title: 'Author Handle', type: 'string' }),
            defineField({ name: 'addedAt', title: 'Date Added', type: 'datetime' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'neighborhood',
      media: 'image',
    },
  },
})
