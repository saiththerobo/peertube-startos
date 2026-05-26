import { FileHelper } from '@start9labs/start-sdk'
import { z } from 'zod'
import { sdk } from '../sdk'

const peertubeLocalConfig = FileHelper.json(
  { base: sdk.volumes.main, subpath: './config/local-production.json' },
  z.any(),
)

export const generateConfig = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  const existing = await peertubeLocalConfig.read().once()
  if (existing) return

  await peertubeLocalConfig.write(effects, {
    transcoding: {
      enabled: true,
      threads: 2,
      concurrency: 1,
      resolutions: {
        '0p': false,
        '144p': false,
        '240p': false,
        '360p': true,
        '480p': true,
        '720p': true,
        '1080p': false,
        '1440p': false,
        '2160p': false,
      },
      always_transcode_original_resolution: true,
      hls: { enabled: true },
      web_videos: { enabled: false },
    },
  })
})
