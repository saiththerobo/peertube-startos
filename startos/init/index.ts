import { sdk } from '../sdk'
import { setDependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'
import { generateSecrets } from './generateSecrets'
import { generateConfig } from './generateConfig'
import { watchCredentials } from './watchCredentials'
import { taskSetPrimaryUrl } from './taskSetPrimaryUrl'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  setDependencies,
  actions,
  generateSecrets,
  generateConfig,
  watchCredentials,
  taskSetPrimaryUrl,
)

export const uninit = sdk.setupUninit(versionGraph)
