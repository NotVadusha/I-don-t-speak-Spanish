import type { SupportedLanguage } from "~helpers/getSupportedLanguages"

interface ConfigureSelectorsProps {
  language: string
  setLanguage: (language: string) => void
  targetLanguage: string
  setTargetLanguage: (language: string) => void
  formality: string
  setFormality: (formality: string) => void
  supportedSourceLanguages: SupportedLanguage[]
  supportedTargetLanguages: SupportedLanguage[]
}

const formalityOptions = {
  default: { label: "Default", value: "default" },
  prefer_more: { label: "More Formal", value: "prefer_more" },
  prefer_less: { label: "Less Formal", value: "prefer_less" }
}

const Selector = ({
  label,
  value,
  options,
  onChange
}: {
  label: string
  value: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
}) => {
  return (
    <div className="flex flex-col items-start justify-start">
      <span className="text-sm text-gray-500">{label}</span>
      <select
        className="p-2 w-full shadow-md rounded-md hover:cursor-pointer hover:bg-accent"
        value={value}
        onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export const ConfigureSelectors = ({
  language,
  setLanguage,
  setTargetLanguage,
  targetLanguage,
  formality,
  setFormality,
  supportedSourceLanguages,
  supportedTargetLanguages
}: ConfigureSelectorsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Selector
        label="Source Language"
        value={language}
        options={supportedSourceLanguages.map((lang) => ({
          label: lang.name,
          value: lang.language
        }))}
        onChange={setLanguage}
      />{" "}
      <Selector
        label="Target Language"
        value={targetLanguage}
        options={supportedTargetLanguages.map((lang) => ({
          label: lang.name,
          value: lang.language
        }))}
        onChange={setTargetLanguage}
      />
      <Selector
        label="Formality"
        value={formality}
        options={Object.values(formalityOptions)}
        onChange={setFormality}
      />
    </div>
  )
}
