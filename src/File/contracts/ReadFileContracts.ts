import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

import { ReadFileResponse } from '../service/ReadFileService'

export abstract class ReadFileContracts {
  public abstract deleteFile(path: string): Promise<void>
  public abstract save(file: MultipartFileContract): Promise<void>
  public abstract readFileCsv(path: string): Promise<ReadFileResponse[]>
}
