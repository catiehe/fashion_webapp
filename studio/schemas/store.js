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
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
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
      name: 'gallery',
      title: 'Image Gallery (Lookbook / Homepage)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'imageUrl', title: 'Image URL', type: 'url' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'products',
      title: 'Best Sellers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Product Name', type: 'string' }),
            defineField({ name: 'price', title: 'Price', type: 'string' }),
            defineField({ name: 'sizes', title: 'Sizes', type: 'string' }),
            defineField({ name: 'colors', title: 'Colors', type: 'string' }),
            defineField({ name: 'material', title: 'Material / Content', type: 'string' }),
            defineField({ name: 'productUrl', title: 'Product Page URL', type: 'url' }),
            defineField({
              name: 'productImages',
              title: 'Product Images',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'imageUrl', title: 'Image URL', type: 'url' }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'source', title: 'Source (Yelp, Google, etc.)', type: 'string' }),
            defineField({ name: 'rating', title: 'Rating', type: 'string' }),
            defineField({ name: 'reviewText', title: 'Review Text', type: 'text' }),
            defineField({ name: 'reviewerName', title: 'Reviewer Name', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'socialPosts',
      title: 'TikTok / Instagram Posts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string' }),
            defineField({ name: 'postUrl', title: 'Post URL', type: 'url' }),
            defineField({ name: 'embedHtml', title: 'Embed HTML', type: 'text' }),
            defineField({ name: 'authorHandle', title: 'Author Handle', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption / Description', type: 'string' }),
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
