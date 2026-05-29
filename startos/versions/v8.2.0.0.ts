import { VersionInfo } from '@start9labs/start-sdk'

export const v_8_2_0_0 = VersionInfo.of({
  version: '8.2.0:0',
  releaseNotes: {
    en_US: 'Update to PeerTube 8.2.0: download rate throttling to prevent botnet catalog scraping, full environment-variable configuration support, prune-storage script improvements, and bug fixes.',
    es_ES: 'Actualización a PeerTube 8.2.0: limitación de velocidad de descarga para evitar el raspado del catálogo por botnets, soporte completo de configuración mediante variables de entorno, mejoras en el script prune-storage y correcciones de errores.',
    de_DE: 'Update auf PeerTube 8.2.0: Download-Ratenbegrenzung zum Schutz vor Botnet-Katalogabrufen, vollständige Konfiguration über Umgebungsvariablen, Verbesserungen am prune-storage-Skript und Fehlerbehebungen.',
    pl_PL: 'Aktualizacja do PeerTube 8.2.0: ograniczanie szybkości pobierania w celu zapobiegania przeszukiwaniu katalogu przez botnety, pełna obsługa konfiguracji przez zmienne środowiskowe, ulepszenia skryptu prune-storage i poprawki błędów.',
    fr_FR: 'Mise à jour vers PeerTube 8.2.0 : limitation du débit de téléchargement pour éviter l\'aspiration du catalogue par des botnets, configuration complète via variables d\'environnement, améliorations du script prune-storage et corrections de bugs.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
