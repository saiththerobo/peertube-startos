import { i18n } from './i18n'
import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'
import {
  getPostgresEnv,
  getPeerTubeEnv,
  getPostgresSub,
  getValkeySub,
  getPeerTubeSub,
  uiPort,
  POSTGRES_USER,
} from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting PeerTube...'))

  const store = await storeJson.read().const(effects)

  if (!store?.postgresPassword || !store?.peertubeSecret || !store?.adminPassword) {
    throw new Error(
      'Required secrets not found in store.json. Please complete setup actions.',
    )
  }

  const postgresPassword = store.postgresPassword
  const peertubeSecret = store.peertubeSecret
  const adminPassword = store.adminPassword
  const primaryUrl = store.primaryUrl

  const postgresSub = await getPostgresSub(effects)
  const valkeySub = await getValkeySub(effects)
  const peerTubeSub = await getPeerTubeSub(effects)

  return sdk.Daemons.of(effects)
    .addDaemon('postgres', {
      subcontainer: postgresSub,
      exec: {
        command: sdk.useEntrypoint(),
        env: getPostgresEnv(postgresPassword),
      },
      ready: {
        display: null,
        fn: async () => {
          const { exitCode } = await postgresSub.exec([
            'pg_isready',
            '-U',
            POSTGRES_USER,
            '-h',
            'localhost',
          ])
          return exitCode === 0
            ? { result: 'success', message: null }
            : { result: 'loading', message: null }
        },
      },
      requires: [],
    })
    .addDaemon('valkey', {
      subcontainer: valkeySub,
      exec: { command: 'valkey-server' },
      ready: {
        display: null,
        fn: async () => {
          const res = await valkeySub.exec(['valkey-cli', 'ping'])
          return res.stdout.toString().trim() === 'PONG'
            ? { result: 'success', message: null }
            : { result: 'loading', message: null }
        },
      },
      requires: [],
    })
    .addDaemon('peertube', {
      subcontainer: peerTubeSub,
      exec: {
        command: sdk.useEntrypoint(),
        env: getPeerTubeEnv({ postgresPassword, peertubeSecret, adminPassword, primaryUrl }),
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: ['postgres', 'valkey'],
    })
})
