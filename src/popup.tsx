import { useEffect, useState } from "react"

import { sendOriginalTextMessageAction } from "./background"

import "./style.css"

import { ConfigureSelectors } from "~ConfigureSelectors"
import { translateText } from "~helpers/getTranslation"

function IndexPopup() {
  const [translation, setTranslation] = useState<string | null>(null)
  const [originalText, setOriginalText] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [targetLanguage, setTargetLanguage] = useState<string>("es")
  const [inputValue, setInputValue] = useState<string>("")
  const [formality, setFormality] = useState<string>("default")

  useEffect(() => {
    chrome.runtime.onMessage.addListener(async (message) => {
      if (message.action === sendOriginalTextMessageAction) {
        try {
          setIsLoading(true)
          const { originalText, translatedText } = await translateText(
            message.originalText,
            targetLanguage,
            formality
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

  useEffect(() => {
    if (originalText) {
      setInputValue(originalText)
    }
  }, [originalText])

  const handleTranslate = async () => {
    const { translatedText } = await translateText(
      inputValue,
      targetLanguage,
      formality
    )
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
        <ConfigureSelectors
          language={targetLanguage}
          setLanguage={setTargetLanguage}
          formality={formality}
          setFormality={setFormality}
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
