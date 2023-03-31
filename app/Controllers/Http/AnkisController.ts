import Event from '@ioc:Adonis/Core/Event'
import Card from 'App/Models/Card'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { join } from 'node:path'
import { ReadFileService } from '../../../src/File/service/ReadFileService'
import { PersisterService } from '../../../src/Persister/service/PersisterService'

export default class AnkisController {
  private _readFileService = new ReadFileService()
  private _persisterService = new PersisterService()

  public async readFile({ request, response }: HttpContextContract) {
    const file = request.file('file')

    if (file) {
      await this._readFileService.save(file)
    }

    const path = join(__dirname, `../../../tmp/uploads/${file?.fileName}`)
    const files = await this._readFileService.readFileCsv(path)

    const cards = await this._persisterService.persisterCard(files)
    await this._readFileService.deleteFile(path)

    Event.emit('anki:create', cards)

    response.status(200).noContent()
  }
}
