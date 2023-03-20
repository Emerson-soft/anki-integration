import {
  AnkiInterfaceResponse,
  AnkiRequestSaveCard,
  CreateModel,
} from '../interface/anki.interface'

export abstract class AnkiContracts {
  public abstract saveCard(request: CreateModel): Promise<AnkiInterfaceResponse>
}
