import Application from '@ioc:Adonis/Core/Application'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import { parse, Parser } from 'csv-parse'
import { createReadStream, unlink } from 'node:fs'

import { ReadFileContracts } from '../contracts/ReadFileContracts'

export interface ReadFileResponse {
  parse: Parser
}

export class ReadFileService implements ReadFileContracts {
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
  public async readFileCsv(path: string): Promise<ReadFileResponse> {
    const readFile = createReadStream(path).pipe(parse({ delimiter: ',', from_line: 2 }))
    return {
      parse: readFile,
    }
  }
}
