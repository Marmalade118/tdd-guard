import { ClientType } from './ClientType'

export type ConfigOptions = {
  mode?: 'production' | 'test'
  projectRoot?: string
  useSystemClaude?: boolean
  anthropicApiKey?: string
  modelType?: string
  modelVersion?: string
  linterType?: string
  validationClient?: ClientType
}
