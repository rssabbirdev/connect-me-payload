import { useState } from 'react'

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [langCode, setLangCode] = useState('en-US') // Default language

  const speak = (text: string) => {
    if (langCode === 'en-US') {
      if (!window.speechSynthesis) {
        console.error('Speech Synthesis API is not supported.')
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = langCode // Use dynamic language
      utterance.rate = 1 // Speed of speech
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
    } else {
      setIsSpeaking(true)
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, lang: langCode }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.audio) {
            const audio = new Audio(data.audio)
            audio.play()
            audio.onended = () => setIsSpeaking(false)
          }
        })
        .catch((err) => {
          setIsSpeaking(false)
          console.log(err)
        })
    }
  }

  return { speak, isSpeaking, setLangCode }
}
