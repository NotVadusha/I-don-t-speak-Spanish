import axios from "axios"

const deeplApiKey = process.env.PLASMO_PUBLIC_TRANSLATION_KEY ?? ""

const apiUrl = process.env.PLASMO_PUBLIC_IS_PRO
  ? "https://api.deepl.com/v2"
  : "https://api-free.deepl.com/v2"

export const deeplApi = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `DeepL-Auth-Key ${deeplApiKey}`
  }
})
