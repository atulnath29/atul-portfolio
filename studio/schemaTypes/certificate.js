// certificate.js — Sanity schema for certifications
export default {
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'platform',
      title: 'Platform / Issuer',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Certificate Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'certificateLink',
      title: 'Certificate Link',
      type: 'url',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required().max(500),
    },
    {
      name: 'recipient',
      title: 'Recipient Name',
      type: 'string',
      initialValue: 'Atul Nath',
    },
  ],
}
