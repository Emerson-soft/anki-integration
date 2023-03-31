import Card from 'App/Models/Card'
import { ReadFileResponse } from 'src/File/service/ReadFileService'

export abstract class Persister {
  public abstract persisterCard(files: ReadFileResponse[]): Promise<Card[]>
}
