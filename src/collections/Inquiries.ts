import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  access: {
    create: anyone,
    delete: authenticated,
    read: anyone,
    update: anyone,
  },
  admin: {
    useAsTitle: 'parentName',
  },
  fields: [
    {
      name: 'parentName',
      type: 'text',
      required: true,
    },
    {
      name: 'studentName',
      type: 'relationship',
      relationTo: 'students',
      hasMany: true,
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['Pending', 'Completed'],
      required: true,
    },
    {
      name: 'reason',
      type: 'text',
    },
  ],
  timestamps: true,
}
