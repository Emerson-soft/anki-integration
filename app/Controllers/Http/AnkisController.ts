import { AnkiService } from './../../../src/Anki/service/AnkiService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { join } from 'node:path'
import { TranslateService } from '../../../src/Translate/service/TranslateService'
import { ReadFileService } from '../../../src/File/service/ReadFileService'

export default class AnkisController {
  private _readFileService = new ReadFileService()
  private _translatedService = new TranslateService()
  private _ankiService = new AnkiService()

  public async readFile({ request }: HttpContextContract) {
    const file = request.file('file')

    if (file) {
      await this._readFileService.save(file)
    }

    const path = join(__dirname, `../../../tmp/uploads/${file?.fileName}`)
    const { parse } = await this._readFileService.readFileCsv(path)
    parse.on('data', async (row) => {
      const { responseData } = await this._translatedService.translated({
        from: 'en',
        to: 'pt-BR',
        text: row[0],
      })

      await this._ankiService.saveCard({
        front: row[0],
        back: responseData.translatedText,
      })
    })
  }
}
