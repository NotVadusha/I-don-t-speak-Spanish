import { deeplApi } from "~deepl.service"

export const translateText = async (
  text: string,
  targetLanguage = "en",
  formality = "default"
) => {
  try {
    const { data } = await deeplApi.post<{
      translations: { detected_source_language: string; text: string }[]
    }>("/translate", {
      text: [text],
      target_lang: targetLanguage,
      formality
    })

    const translation = data.translations[0].text

    return { originalText: text, translatedText: translation }
  } catch (error) {
    console.error(error)
    return { originalText: text, translatedText: "" }
  }
}
