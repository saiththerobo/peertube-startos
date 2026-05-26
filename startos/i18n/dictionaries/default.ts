export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting PeerTube...': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'The PeerTube web interface': 5,

  // actions/setAdminPassword.ts
  'Set Admin Password': 6,
  'Display login credentials for the PeerTube root account. On first run, a password is generated and stored. To rotate after the initial setup, change it via PeerTube\'s web interface instead.': 7,
  'Login Credentials': 8,
  'Use these credentials to sign in to PeerTube. The username is always "root".': 9,
  'Username': 10,
  'Password': 11,

  // actions/setPrimaryUrl.ts
  'Set Primary URL': 12,
  'Choose which URL PeerTube uses when generating video links and for ActivityPub federation. Changes apply on next restart.': 13,
  'URL': 14,

  // init/watchCredentials.ts
  'Set the admin password to sign in for the first time': 15,

  // init/taskSetPrimaryUrl.ts
  'Primary URL is no longer available. Select a new one.': 16,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
