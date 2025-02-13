import { getPayload } from 'payload'
import config from '@payload-config'

export const sendOTPEmail = async (to: string, otp: string) => {
  const payload = await getPayload({ config })
  try {
    const email = await payload.sendEmail({
      to,
      subject: 'Your OTP Code',
      html: `<p>Your OTP is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
    })

    // if (error) throw new Error(error.message)
    console.log(`OTP sent to ${to}: ${otp}`)
    console.log('email.data', email)
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send OTP email')
  }
}
