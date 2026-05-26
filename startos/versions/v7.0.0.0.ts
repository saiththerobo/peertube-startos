import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_7_0_0_0 = VersionInfo.of({
  version: '7.0.0:0',
  releaseNotes: {
    en_US: 'Initial StartOS package for PeerTube 7.',
    es_ES: 'Paquete inicial de StartOS para PeerTube 7.',
    de_DE: 'Erstes StartOS-Paket für PeerTube 7.',
    pl_PL: 'Pierwsze pakiet StartOS dla PeerTube 7.',
    fr_FR: 'Premier paquet StartOS pour PeerTube 7.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
