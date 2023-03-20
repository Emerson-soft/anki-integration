export interface ResponseTranslate {
  responseData: ResponseData
  quotaFinished: boolean
  mtLangSupported?: string
  responseDetails: string
  responseStatus: number
  responderId?: number
  exception_code?: number
  matches: Matches[]
}

export interface RequestTranslate {
  to: string
  from: string
  text: string
}

export interface ResponseData {
  translatedText: string
  match: number
}

export interface Matches {
  id: string
  segment: string
  translation: string
  source: string
  target: string
  quality: string
  reference?: string
  subject: string
  match: number
}
