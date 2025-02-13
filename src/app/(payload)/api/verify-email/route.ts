import { NextRequest, NextResponse } from 'next/server'
import { User } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function PATCH(req: NextRequest) {
  if (req.method !== 'PATCH') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })
  }

  try {
    const payload = await getPayload({ config })
    const { id, _otp } = await req.json()

    if (!id || !_otp) {
      return NextResponse.json({ message: 'ID and OTP are required' }, { status: 400 })
    }

    // Find the user
    const userReq = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}?showHiddenFields=true`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const user: User = await userReq.json()
    console.log(user)

    if (!user || !user.id) {
      return NextResponse.json({ message: 'User not Found', status: false }, { status: 404 })
    }

    if (user._otp?.length === 0) {
      return NextResponse.json({ message: 'User already verified', status: false }, { status: 400 })
    }

    if (user._otp !== _otp) {
      return NextResponse.json({ message: 'Invalid OTP', status: false }, { status: 400 })
    }

    // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}`, {
    //   method: 'PATCH',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     _verified: true,
    //     _otp: '',
    //     _verificationToken: '',
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('succes', data)
    //   })
    //   .catch((err) => {
    //     return NextResponse.json({ message: 'Verification failed', status: false }, { status: 500 })
    //   })
    await payload.update({
      collection: 'users',
      id: id,
      data: {
        _otp: '',
        _verificationToken: '',
        _verified: true,
      },
    })
    return NextResponse.json(
      { message: 'Email verified successfully!', status: true },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Verification failed', status: false }, { status: 500 })
  }
}
