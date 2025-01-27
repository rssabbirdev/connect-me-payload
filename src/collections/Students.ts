import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Students: CollectionConfig = {
  slug: 'students',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'studentName',
  },
  fields: [
    {
      name: 'studentName',
      type: 'text',
      required: true,
    },
    {
      name: 'parentName',
      type: 'text',
      required: true,
    },
    {
      name: 'parentMobileNumber',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'stuentMobileNumber',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'studentClass',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'studentId',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
