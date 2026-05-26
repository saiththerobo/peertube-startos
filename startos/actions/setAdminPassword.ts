import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const setAdminPassword = sdk.Action.withoutInput(
  'set-admin-password',

  async () => ({
    name: i18n('Set Admin Password'),
    description: i18n(
      'Display login credentials for the PeerTube root account. On first run, a password is generated and stored. To rotate after the initial setup, change it via PeerTube\'s web interface instead.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const stored = await storeJson.read((s) => s.adminPassword).once()
    const adminPassword =
      stored ?? utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 24 })

    if (!stored) {
      await storeJson.merge(effects, { adminPassword })
    }

    return {
      version: '1',
      title: i18n('Login Credentials'),
      message: i18n(
        'Use these credentials to sign in to PeerTube. The username is always "root".',
      ),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Username'),
            description: null,
            value: 'root',
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: adminPassword,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
