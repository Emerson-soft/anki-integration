import { AnkiContracts } from '../contracts/AnkiContracts'
import {
  AnkiInterfaceResponse,
  AnkiRequestSaveCard,
  CreateModel,
} from '../interface/anki.interface'
import axios from 'axios'

export class AnkiService implements AnkiContracts {
  private model = new AnkiRequestSaveCard()
  private baseUrl = 'http://127.0.0.1:8765'

  public async saveCard({ back, front }: CreateModel): Promise<AnkiInterfaceResponse> {
    this.model.params.note.fields.Front = front
    this.model.params.note.fields.Back = back

    const { data } = await axios.post<AnkiInterfaceResponse>(this.baseUrl, this.model)

    return {
      error: data.error,
      result: data.result,
    }
  }
}
