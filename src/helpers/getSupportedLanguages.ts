import { deeplApi } from "~deepl.service"

interface SupportedLanguage {
  language: string
  name: string
  supports_formality: boolean
}

export const getSupportedLanguages = async (): Promise<SupportedLanguage[]> => {
  try {
    const { data } = await deeplApi.get<SupportedLanguage[]>(
      "/languages?type=source"
    )
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
