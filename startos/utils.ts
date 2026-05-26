import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 9000 as const
export const POSTGRES_PATH = '/var/lib/postgresql' as const
export const POSTGRES_DB = 'peertube' as const
export const POSTGRES_USER = 'peertube' as const
export const PGDATA = `${POSTGRES_PATH}/data` as const

export function getPostgresEnv(password: string) {
  return {
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD: password,
    PGDATA,
  }
}

export function getPeerTubeEnv(opts: {
  postgresPassword: string
  peertubeSecret: string
  adminPassword: string
  primaryUrl?: string
}) {
  let webserverHostname = 'localhost'
  let webserverHttps = false
  let webserverPort = 80

  if (opts.primaryUrl) {
    try {
      const parsed = new URL(opts.primaryUrl)
      webserverHostname = parsed.hostname
      webserverHttps = parsed.protocol === 'https:'
      webserverPort = parsed.port
        ? parseInt(parsed.port)
        : webserverHttps
          ? 443
          : 80
    } catch {}
  }

  return {
    PEERTUBE_DB_HOSTNAME: 'localhost',
    PEERTUBE_DB_PORT: '5432',
    PEERTUBE_DB_USERNAME: POSTGRES_USER,
    PEERTUBE_DB_PASSWORD: opts.postgresPassword,
    PEERTUBE_DB_NAME: POSTGRES_DB,
    PEERTUBE_REDIS_HOSTNAME: 'localhost',
    PEERTUBE_WEBSERVER_HOSTNAME: webserverHostname,
    PEERTUBE_WEBSERVER_PORT: String(webserverPort),
    PEERTUBE_WEBSERVER_HTTPS: String(webserverHttps),
    PEERTUBE_SECRET: opts.peertubeSecret,
    PEERTUBE_ADMIN_EMAIL: 'admin@peertube.local',
    PT_INITIAL_ROOT_PASSWORD: opts.adminPassword,
    PEERTUBE_TRUST_PROXY: '["loopback","uniquelocal"]',
  }
}

export function getPostgresSub(effects: T.Effects) {
  return sdk.SubContainer.of(
    effects,
    { imageId: 'postgres' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'db',
      subpath: null,
      mountpoint: POSTGRES_PATH,
      readonly: false,
    }),
    'postgres-sub',
  )
}

export function getValkeySub(effects: T.Effects) {
  return sdk.SubContainer.of(
    effects,
    { imageId: 'valkey' },
    sdk.Mounts.of(),
    'valkey-sub',
  )
}

export function getPeerTubeSub(effects: T.Effects) {
  return sdk.SubContainer.of(
    effects,
    { imageId: 'peertube' },
    sdk.Mounts.of()
      .mountVolume({
        volumeId: 'main',
        subpath: 'data',
        mountpoint: '/data',
        readonly: false,
      })
      .mountVolume({
        volumeId: 'main',
        subpath: 'config',
        mountpoint: '/config',
        readonly: false,
      }),
    'peertube-sub',
  )
}

export async function getNonLocalUrls(effects: T.Effects): Promise<string[]> {
  return sdk.serviceInterface
    .getOwn(effects, 'ui', (i) => i?.addressInfo?.nonLocal.format() || [])
    .once()
}
