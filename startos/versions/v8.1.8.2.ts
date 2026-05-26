import { VersionInfo } from '@start9labs/start-sdk'

export const v_8_1_8_2 = VersionInfo.of({
  version: '8.1.8:2',
  releaseNotes: {
    en_US: 'Fix: pre-configure transcoding resolutions (360p/480p/720p) on install so uploaded videos transcode immediately.',
    es_ES: 'Corrección: preconfigurar resoluciones de transcodificación (360p/480p/720p) en la instalación para que los vídeos subidos se transcodifiquen inmediatamente.',
    de_DE: 'Fix: Transcodierungsauflösungen (360p/480p/720p) bei der Installation vorkonfigurieren, damit hochgeladene Videos sofort transcodiert werden.',
    pl_PL: 'Poprawka: wstępna konfiguracja rozdzielczości transkodowania (360p/480p/720p) przy instalacji, aby przesłane filmy były transkodowane natychmiast.',
    fr_FR: 'Correction : préconfiguration des résolutions de transcodage (360p/480p/720p) à l\'installation pour que les vidéos téléversées soient transcodées immédiatement.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
