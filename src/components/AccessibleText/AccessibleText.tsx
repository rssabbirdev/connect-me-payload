'use client'
import { useSpeech } from '@/hooks/useSpeech'
import { useEffect } from 'react'
import { IoVolumeHigh } from 'react-icons/io5'
import { LuSpeech } from 'react-icons/lu'

type AccessibleTextProps = {
  text: string
  buttonPosition?: 'left' | 'right' | undefined
  children?: React.ReactNode
  lang?: 'ar-SA' | 'en-US' | string
}

export default function AccessibleText({
  text,
  buttonPosition,
  children,
  lang,
}: AccessibleTextProps) {
  const { speak, isSpeaking, setLangCode } = useSpeech()
  useEffect(() => {
    if (lang) {
      setLangCode(lang)
    } else {
      setLangCode('en-US')
    }
  }, [lang, setLangCode])

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-2">
        {buttonPosition === 'left' && (
          <button onClick={() => speak(text)} disabled={isSpeaking} className="p-2">
            {isSpeaking ? (
              <LuSpeech className={`text-lg scale-x-[-1]`} />
            ) : (
              <IoVolumeHigh className={`text-lg rotate-180`} />
            )}
          </button>
        )}
        {children}
        {buttonPosition === undefined && (
          <button onClick={() => speak(text)} disabled={isSpeaking} className="p-2">
            {isSpeaking ? (
              <LuSpeech className={`text-lg`} />
            ) : (
              <IoVolumeHigh className={`text-lg`} />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
