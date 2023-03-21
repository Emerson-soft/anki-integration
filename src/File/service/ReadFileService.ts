import Application from '@ioc:Adonis/Core/Application'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import csvToJson from 'csvtojson'
import { unlink } from 'node:fs'

import { ReadFileContracts } from '../contracts/ReadFileContracts'

export interface ReadFileResponse {
  front: string
}

export class ReadFileService implements ReadFileContracts {
  private csv = csvToJson()

  public async deleteFile(path: string): Promise<void> {
    unlink(path, (err) => {
      if (err) {
        console.log(err)
      }

      console.log('File deleted!')
    })
  }
  public async save(file: MultipartFileContract): Promise<void> {
    await file.move(Application.tmpPath('uploads'))
  }
  public async readFileCsv(path: string): Promise<ReadFileResponse[]> {
    const file: ReadFileResponse[] = await this.csv.fromFile(path)
    return file
  }
}
