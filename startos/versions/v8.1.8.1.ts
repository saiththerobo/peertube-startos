import { VersionInfo } from '@start9labs/start-sdk'

export const v_8_1_8_1 = VersionInfo.of({
  version: '8.1.8:1',
  releaseNotes: {
    en_US: 'Fix service startup; update icon to official PeerTube logo.',
    es_ES: 'Corrección del inicio del servicio; actualización del ícono al logo oficial de PeerTube.',
    de_DE: 'Dienststart behoben; Icon auf offizielles PeerTube-Logo aktualisiert.',
    pl_PL: 'Naprawiono uruchamianie usługi; zaktualizowano ikonę do oficjalnego logo PeerTube.',
    fr_FR: 'Correction du démarrage du service ; mise à jour de l\'icône vers le logo officiel de PeerTube.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
