import { VersionGraph } from '@start9labs/start-sdk'
import { v_8_1_8_2 } from './v8.1.8.2'
import { v_8_1_8_1 } from './v8.1.8.1'
import { v_8_1_8_0 } from './v8.1.8.0'

export const versionGraph = VersionGraph.of({
  current: v_8_1_8_2,
  other: [v_8_1_8_1, v_8_1_8_0],
})
