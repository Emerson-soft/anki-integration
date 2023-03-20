import { TranslateContracts } from '../contracts/TranslateContracts'
import { RequestTranslate, ResponseTranslate } from '../interface/translate.interface'
import axios from 'axios'

export class TranslateService implements TranslateContracts {
  private baseUrl = 'https://api.mymemory.translated.net/'

  public async translated(request: RequestTranslate): Promise<ResponseTranslate> {
    const { from, to, text } = request
    const url = `${this.baseUrl}get?q=${text}&langpair=${from}|${to}`

    const { data } = await axios.get<ResponseTranslate>(url)

    return data
  }
}
