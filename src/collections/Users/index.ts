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
    forgotPassword: {
      generateEmailSubject: (context) => {
        return `${context?.user?.name ? `Hey, ${context?.user?.name}. Reset Your Password` : 'Reset Your Password'}`
      },
      generateEmailHTML: (context) => {
        // Use the token provided to allow your user to reset their password
        const resetPasswordURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${context?.token}`

        return `
          <!doctype html>
          <html>
            <body>
              <h1>Password reset request for ConnectMe!</h1>
              <p>Your are receiving this because you (or someone else) have requested the reset of he password for your account. Please click on the following link, or paste this into your browser to complete the process:</p>
              <p>Click below to reset your password.</p>
              <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
              </p>
              <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            </body>
          </html>
        `
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
      defaultValue: ['admin'],
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
