import { useEffect, useState } from "react"

import { getSupportedLanguages } from "~helpers/getSupportedLanguages"

interface ConfigureSelectorsProps {
  language: string
  setLanguage: (language: string) => void
  formality: string
  setFormality: (formality: string) => void
}

const formalityOptions = {
  default: { label: "default", value: "default" },
  prefer_more: { label: "prefer_more", value: "prefer_more" },
  prefer_less: { label: "prefer_less", value: "prefer_less" }
}

export const ConfigureSelectors = ({
  language,
  setLanguage,
  formality,
  setFormality
}: ConfigureSelectorsProps) => {
  const [supportedLanguages, setSupportedLanguages] = useState<
    {
      language: string
      name: string
      supports_formality: boolean
    }[]
  >([])

  useEffect(() => {
    ;(async () => {
      const data = await getSupportedLanguages()

      setSupportedLanguages(data)
      setLanguage(
        data.find((lang) => lang.language === "es")?.language ??
          data[0].language
      )
    })()
  }, [])

  return (
    <div>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        {supportedLanguages.map((lang) => (
          <option key={lang.language} value={lang.language}>
            {lang.name}
          </option>
        ))}
      </select>
      <select value={formality} onChange={(e) => setFormality(e.target.value)}>
        {Object.values(formalityOptions).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
