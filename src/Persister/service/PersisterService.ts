import Card from 'App/Models/Card'
import { ReadFileResponse } from 'src/File/service/ReadFileService'

import { Persister } from '../contracts/Persister'

export class PersisterService implements Persister {
  public async persisterCard(files: ReadFileResponse[]): Promise<Card[]> {
    const cards: Card[] = []

    for (const item of files) {
      const card = await Card.create({
        isProcess: false,
        front: item.front,
      })

      cards.push(card)
    }

    return cards
  }
}
