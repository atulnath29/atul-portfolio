// badge.js — Sanity schema for coding platform badges
export default {
  name: 'badge',
  title: 'Badge',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Badge Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'LeetCode', value: 'leetcode' },
          { title: 'HackerRank', value: 'hackerrank' },
          { title: 'Google Skills', value: 'google-skills' },
          { title: 'Microsoft', value: 'microsoft' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required().max(500),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Badge Icon',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
