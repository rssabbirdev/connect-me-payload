import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '@/access/anyone'
import adminsAndUser from './access/adminsAndUser'
import crypto from 'crypto'
import { isAdminFieldLevel } from '@/access/isAdminFieldLevel'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: anyone,
    create: anyone,
    update: anyone,
    delete: authenticated,
    // admin: ({ req: { user } }) => checkRole(['admin'], user),
    admin: isAdminFieldLevel,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    verify: {
      generateEmailSubject: ({ req, user }) => {
        return `Hey ${user.name}, Your OTP Code!`
      },
      generateEmailHTML: ({ req, token, user }) => {
        // Use the token provided to allow your user to verify their account
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/verify?token=${token}`

        return `<p>Your OTP is: <strong>${user._otp}</strong>. It will expire in 10 minutes.</p> <p>Or you can verify your email by clicking here: ${url}</p>`
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: '_otp',
      type: 'text',
      admin: { hidden: true },
      access: {
        create: () => true,
        update: () => true,
      },
      defaultValue: crypto.randomInt(100000, 999999).toString(),
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
      // access: {
      //   read: admins,
      //   create: admins,
      //   update: admins,
      // },
    },
  ],
  hooks: {
    // afterChange: [createOtp],
  },
  timestamps: true,
}
