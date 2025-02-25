import { NextRequest, NextResponse } from 'next/server'
import { TextToSpeechClient } from '@google-cloud/text-to-speech'

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}')

const client = new TextToSpeechClient({ credentials })

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') return NextResponse.json({ message: 'Method Not Allowed' })

  const { text, lang } = await req.json()

  try {
    const [response] = await client.synthesizeSpeech({
      input: { text: text },
      voice: { languageCode: lang, ssmlGender: 'MALE' },
      audioConfig: { audioEncoding: 'MP3' },
    })
    // Convert buffer to base64 properly
    const audioBase64 = Buffer.from(response.audioContent as Uint8Array).toString('base64')
    return new NextResponse(
      JSON.stringify({
        audio: `data:audio/mpeg;base64,${audioBase64}`,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request', error })
  }
}
