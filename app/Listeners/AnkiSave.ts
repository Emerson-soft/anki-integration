import { TranslateService } from './../../src/Translate/service/TranslateService'
import type { EventsList } from '@ioc:Adonis/Core/Event'
import { AnkiService } from '../../src/Anki/service/AnkiService'
import axios from 'axios'

export default class AnkiSave {
  private _translateService = new TranslateService()
  private _ankiService = new AnkiService()

  public async saveCardAnki(anki: EventsList['anki:create']) {
    if (!anki.length) return

    const { status } = await axios.get('http://127.0.0.1:8765')

    if (status === 200) {
      for (const item of anki) {
        const { responseData } = await this._translateService.translated({
          from: 'en',
          to: 'pt-BR',
          text: item.front,
        })

        await this._ankiService.saveCard({
          front: item.front,
          back: responseData.translatedText,
        })

        item.isProcess = true
        await item.save()
      }
    }
  }
}
