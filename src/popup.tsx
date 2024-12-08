import axios from "axios"
import { useEffect, useState } from "react"

import { sendOriginalTextMessageAction } from "~background"

import "./style.css"

const googleTranslateApiKey = process.env.PLASMO_PUBLIC_TRANSLATION_KEY ?? ""

const translateText = async (text: string, targetLanguage = "en") => {
  const { data } = await axios.post(
    "https://translation.googleapis.com/language/translate/v2",
    { q: text, target: targetLanguage },
    {
      params: { key: googleTranslateApiKey }
    }
  )

  const translation =
    data?.data?.translations[0]?.translatedText || "Translation failed"

  return { originalText: text, translatedText: translation }
}

const ChangeThemeIcon = () => {
  return <span>icon</span>
}

function IndexPopup() {
  const [translation, setTranslation] = useState<string | null>(null)
  const [originalText, setOriginalText] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    chrome.runtime.onMessage.addListener(async (message) => {
      if (message.action === sendOriginalTextMessageAction) {
        try {
          setIsLoading(true)
          const { originalText, translatedText } = await translateText(
            message.originalText
          )

          setOriginalText(originalText)
          setTranslation(translatedText)
        } catch (e) {
          console.error(e)
        } finally {
          setIsLoading(false)
        }
      }
    })
  }, [])

  return (
    <div className="p-6 w-96">
      <div className="flex flex-row justify-between">
        <h1>IDK Spanish!</h1>
        <ChangeThemeIcon />
      </div>
      <div className="mt-2 flex flex-col gap-2 justify-center bg-slate-500">
        <div>
          <input className="bg-red-500 p-2 w-full" type="text" name="" id="" />
        </div>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <>
            <span className="text-red-300 font-semibold mt-2">
              {originalText}
            </span>
            <button className="bg-sky-300">Translate</button>
            <span className="text-red-300 font-semibold mt-2">
              {translation}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default IndexPopup