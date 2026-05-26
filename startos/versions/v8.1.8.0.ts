import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_8_1_8_0 = VersionInfo.of({
  version: '8.1.8:0',
  releaseNotes: {
    en_US: 'Initial StartOS package for PeerTube 8.1.8.',
    es_ES: 'Paquete inicial de StartOS para PeerTube 8.1.8.',
    de_DE: 'Erstes StartOS-Paket für PeerTube 8.1.8.',
    pl_PL: 'Pierwsze pakiet StartOS dla PeerTube 8.1.8.',
    fr_FR: 'Premier paquet StartOS pour PeerTube 8.1.8.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
