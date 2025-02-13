import { AfterChangeHook } from 'node_modules/payload/dist/collections/config/types'
import crypto from 'crypto'
import { sendOTPEmail } from '@/utilities/emailService'

export const createOtp: AfterChangeHook = async ({ doc, operation, req }) => {
  console.log(doc)
  if (operation === 'create' && !doc.verified) {
    const _otp = crypto.randomInt(100000, 999999).toString()
    await sendOTPEmail(doc.email, _otp)
    // Dynamically import payload

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${doc.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _otp: _otp,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }
  return
}
