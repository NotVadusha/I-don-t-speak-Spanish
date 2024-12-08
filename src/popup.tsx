import { useEffect, useState } from "react"

import { sendOriginalTextMessageAction } from "./background"

import "./style.css"

import { Button } from "~components/ui/button"
import { Separator } from "~components/ui/separator"
import { Skeleton } from "~components/ui/skeleton"
import { Textarea } from "~components/ui/textarea"
import { ConfigureSelectors } from "~ConfigureSelectors"
import type { SupportedLanguage } from "~helpers/getSupportedLanguages"
import { getSupportedLanguages } from "~helpers/getSupportedLanguages"
import { translateText } from "~helpers/getTranslation"

function IndexPopup() {
  const [translation, setTranslation] = useState<string | null>(null)
  const [originalText, setOriginalText] = useState<string | null>(null)
  const [sourceLanguage, setSourceLanguage] = useState<string>("")
  const [targetLanguage, setTargetLanguage] = useState<string>("es")
  const [inputValue, setInputValue] = useState<string>("")

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formality, setFormality] = useState<string>("default")
  const [supportedSourceLanguages, setSupportedSourceLanguages] = useState<
    SupportedLanguage[]
  >([])
  const [supportedTargetLanguages, setSupportedTargetLanguages] = useState<
    SupportedLanguage[]
  >([])

  useEffect(() => {
    ;(async () => {
      const [supportedSourceLanguages, supportedTargetLanguages] =
        await Promise.all([
          getSupportedLanguages("source"),
          getSupportedLanguages("target")
        ])

      setSupportedSourceLanguages(supportedSourceLanguages)
      setSupportedTargetLanguages(supportedTargetLanguages)

      const defaultLanguage =
        supportedTargetLanguages.find(
          (lang) => lang.language.toLowerCase() === "es"
        )?.language ?? supportedTargetLanguages[0]?.language

      const defaultSourceLanguage =
        supportedSourceLanguages.find(
          (lang) => lang.language.toLowerCase() === "en"
        )?.language ?? supportedSourceLanguages[0]?.language

      defaultLanguage && setTargetLanguage(defaultLanguage)
      defaultSourceLanguage && setSourceLanguage(defaultSourceLanguage)
    })()
  }, [])

  useEffect(() => {
    chrome.runtime.onMessage.addListener(async (message) => {
      setIsLoading(true)
      if (message.action === sendOriginalTextMessageAction) {
        try {
          const { originalText, translatedText, language } =
            await translateText(message.originalText, targetLanguage, formality)

          setSourceLanguage(language)
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
    setIsLoading(true)
    const { translatedText } = await translateText(
      inputValue,
      targetLanguage,
      formality
    )

    setTranslation(translatedText)
    setIsLoading(false)
  }

  useEffect(() => {
    handleTranslate()
  }, [targetLanguage, formality, originalText])

  return (
    <div className="p-4 min-w-[30rem]">
      <h1 className="text-xl flex flex-row items-center justify-end ">
        IDK Spanish! <span className="text-2xl">🇪🇸</span>
      </h1>

      <Separator className="mb-6 mt-2" />

      <ConfigureSelectors
        language={sourceLanguage}
        setLanguage={setSourceLanguage}
        targetLanguage={targetLanguage}
        setTargetLanguage={setTargetLanguage}
        formality={formality}
        setFormality={setFormality}
        supportedSourceLanguages={supportedSourceLanguages}
        supportedTargetLanguages={supportedTargetLanguages}
      />

      <Button
        variant="outline"
        className="w-full my-2 shadow-md"
        onClick={handleTranslate}>
        Translate
      </Button>

      {isLoading ? (
        <>
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-10 mt-2" />
        </>
      ) : (
        <>
          <Textarea
            className="shadow-md rounded-md"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <div className="mt-2 p-2 bg-white rounded-md border border-gray-200 shadow-md">
            <span className="text-red-300 font-semibold">{translation}</span>
          </div>
        </>
      )}

      <Separator className="mt-6 mb-2" />

      <div>
        <h3 className="text-md">
          DeepL API was provided by{" "}
          <a className="text-blue-700 font-bold" href="https://deepl.com">
            DeepL
          </a>
          .
        </h3>
      </div>
    </div>
  )
}

export default IndexPopup
