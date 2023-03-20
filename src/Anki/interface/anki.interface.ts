export interface CreateModel {
  front: string
  back: string
}

export interface AnkiInterfaceRequest {
  action: string
  version: number
  params: Params
}

export interface AnkiInterfaceResponse {
  result: number
  error: string | null
}

type Action = 'addNote' | 'save'

export interface Params {
  note: Note
  tags?: string[]
  audio?: MediaBody
  video?: MediaBody
  picture?: MediaBody
}

interface Note {
  deckName: string
  modelName: string
  fields: Fields
  options: Options
}

interface Fields {
  Front: string
  Back: string
}

interface Options {
  allowDuplicate: boolean
  duplicateScope: string
  duplicateScopeOptions: DuplicateScopeOption
}

interface DuplicateScopeOption {
  deckName: string
  checkChildren: boolean
  checkAllModels: boolean
}

interface MediaBody {
  url: string
  filename: string
  skipHash: string
  fields: string[]
}

export class AnkiRequestSaveCard implements AnkiInterfaceRequest {
  constructor(
    public action = 'addNote',
    public version = 6,
    public params: Params = {
      note: {
        deckName: 'English insano',
        modelName: 'Basic',
        fields: {
          Front: '',
          Back: '',
        },
        options: {
          allowDuplicate: false,
          duplicateScope: 'deck',
          duplicateScopeOptions: {
            deckName: 'English insano',
            checkChildren: false,
            checkAllModels: false,
          },
        },
      },
    }
  ) {}
}
