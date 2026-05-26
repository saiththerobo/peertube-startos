import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'peertube',
  title: 'PeerTube',
  license: 'agpl-3.0',
  packageRepo: 'https://github.com/saiththerobo/peertube-startos',
  upstreamRepo: 'https://github.com/Chocobozzz/PeerTube',
  marketingUrl: 'https://joinpeertube.org/',
  donationUrl: 'https://joinpeertube.org/en_US/support',
  description: { short, long },
  volumes: ['main', 'db'],
  images: {
    postgres: {
      source: { dockerTag: 'postgres:17-alpine' },
      arch: ['x86_64', 'aarch64'],
    },
    valkey: {
      source: { dockerTag: 'valkey/valkey:9-alpine' },
      arch: ['x86_64', 'aarch64'],
    },
    peertube: {
      source: { dockerTag: 'chocobozzz/peertube:production' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
