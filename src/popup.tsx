import axios from "axios"
import { useEffect, useState } from "react"

import { sendOriginalTextMessageAction } from "./background"

import "./style.css"

const googleTranslateApiKey = process.env.PLASMO_PUBLIC_TRANSLATION_KEY ?? ""
const projectId = process.env.PLASMO_PUBLIC_PROJECT_ID ?? ""

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

interface LanguageSelectorProps {
  language: string
  setLanguage: (language: string) => void
}

const LanguageSelector = ({ language, setLanguage }: LanguageSelectorProps) => {
  const [supportedLanguages, setSupportedLanguages] = useState<
    { languageCode: string; displayName: string }[]
  >([])

  useEffect(() => {
    const getSupportedLanguages = async () => {
      const { data } = await axios.get(
        `https://translate.googleapis.com/v3/projects/${projectId}/locations/global/supportedLanguages`
      )

      setSupportedLanguages(data.languages)
    }

    getSupportedLanguages()
  }, [])

  return (
    <div>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        {supportedLanguages.map((lang) => (
          <option key={lang.languageCode} value={lang.languageCode}>
            {lang.displayName}
          </option>
        ))}
      </select>
    </div>
  )
}

function IndexPopup() {
  const [translation, setTranslation] = useState<string | null>(null)
  const [originalText, setOriginalText] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [targetLanguage, setTargetLanguage] = useState<string>("es")
  const [inputValue, setInputValue] = useState<string>("")

  useEffect(() => {
    chrome.runtime.onMessage.addListener(async (message) => {
      if (message.action === sendOriginalTextMessageAction) {
        try {
          setIsLoading(true)
          const { originalText, translatedText } = await translateText(
            message.originalText
          )

          console.log(originalText, translatedText)

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

  useEffect(() => {
    if (originalText) {
      setInputValue(originalText)
    }
  }, [originalText])

  const handleTranslate = async () => {
    const { translatedText } = await translateText(inputValue, targetLanguage)
    setTranslation(translatedText)
  }

  return (
    <div className="p-6 w-96">
      <div className="flex flex-row justify-end">
        <h1 className="text-xl flex flex-row items-center">
          IDK Spanish! <span className="text-2xl">🇪🇸</span>
        </h1>
      </div>
      <div className="mt-2 flex flex-col gap-2 justify-center bg-slate-500">
        <LanguageSelector
          language={targetLanguage}
          setLanguage={setTargetLanguage}
        />
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <>
            <input
              className="bg-red-500 p-2 w-full"
              type="text"
              name=""
              id=""
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="bg-sky-300" onClick={handleTranslate}>
              Translate
            </button>
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
