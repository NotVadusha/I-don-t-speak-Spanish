import { deeplApi } from "~deepl.service"

export interface SupportedLanguage {
  language: string
  name: string
  supports_formality: boolean
}

export const getSupportedLanguages = async (
  type: "source" | "target"
): Promise<SupportedLanguage[]> => {
  try {
    const { data } = await deeplApi.get<SupportedLanguage[]>(
      `/languages?type=${type}`
    )
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
