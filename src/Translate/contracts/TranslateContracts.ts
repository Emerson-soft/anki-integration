import { RequestTranslate, ResponseTranslate } from '../interface/translate.interface'

export abstract class TranslateContracts {
  public abstract translated(request: RequestTranslate): Promise<ResponseTranslate>
}
