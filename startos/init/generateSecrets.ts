import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const generateSecrets = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  await storeJson.merge(effects, {
    postgresPassword: utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 24 }),
    peertubeSecret: utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 64 }),
  })
})
