import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'
import { POSTGRES_DB, POSTGRES_PATH, POSTGRES_USER } from './utils'

export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.withPgDump({
    imageId: 'postgres',
    dbVolume: 'db',
    mountpoint: POSTGRES_PATH,
    pgdataPath: '/data',
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: async () => {
      const pw = await storeJson.read((s) => s.postgresPassword).once()
      if (!pw) throw new Error('No postgresPassword found in store.json')
      return pw
    },
  }).addVolume('main'),
)
