import { VersionInfo } from '@start9labs/start-sdk'

export const v_8_1_8_3 = VersionInfo.of({
  version: '8.1.8:3',
  releaseNotes: {
    en_US: 'Fix client IP detection by setting PEERTUBE_TRUST_PROXY; pre-configure transcoding resolutions on install.',
    es_ES: 'Corrección de la detección de IP del cliente con PEERTUBE_TRUST_PROXY; preconfiguración de resoluciones de transcodificación en la instalación.',
    de_DE: 'Client-IP-Erkennung durch PEERTUBE_TRUST_PROXY behoben; Transcodierungsauflösungen bei der Installation vorkonfiguriert.',
    pl_PL: 'Poprawka wykrywania IP klienta przez PEERTUBE_TRUST_PROXY; wstępna konfiguracja rozdzielczości transkodowania przy instalacji.',
    fr_FR: 'Correction de la détection de l\'IP client via PEERTUBE_TRUST_PROXY ; préconfiguration des résolutions de transcodage à l\'installation.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
