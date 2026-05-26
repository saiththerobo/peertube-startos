<p align="center">
  <img src="icon.svg" alt="PeerTube Logo" width="21%">
</p>

# PeerTube on StartOS

> **Upstream repo:** <https://github.com/Chocobozzz/PeerTube>

PeerTube is a free, open-source, and decentralized video platform powered by ActivityPub. This package runs PeerTube on StartOS with a PostgreSQL database and Valkey cache.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Container  | Image                              | Architectures      |
| ---------- | ---------------------------------- | ------------------ |
| peertube   | `chocobozzz/peertube:v8.1.8`       | x86_64, aarch64    |
| postgres   | `postgres:17-alpine`               | x86_64, aarch64    |
| valkey     | `valkey/valkey:9-alpine`           | x86_64, aarch64    |

All three containers share the host network namespace. PeerTube communicates with PostgreSQL and Valkey over `localhost`.

---

## Volume and Data Layout

| Volume | Container Mount     | Purpose                          |
| ------ | ------------------- | -------------------------------- |
| `main` | `/data` (peertube)  | Uploads, thumbnails, HLS streams |
| `main` | `/config` (peertube)| Runtime config, local overrides  |
| `db`   | `/var/lib/postgresql` (postgres) | PostgreSQL data |

`store.json` (inside `main`) holds generated secrets (postgres password, PeerTube secret, admin password) and the user-selected primary URL.

---

## Installation and First-Run Flow

1. **Install** — StartOS pulls all three images. `generateSecrets` runs on init and writes `postgresPassword` and `peertubeSecret` to `store.json`.
2. **Critical task: Set Admin Password** — `watchCredentials` creates this task because `adminPassword` is not yet set. The user runs the **Set Admin Password** action, which generates a password, stores it in `store.json`, and displays it.
3. **Primary URL (auto-set)** — `taskSetPrimaryUrl` tries to auto-select the `.local` LAN URL. If none is available, a critical task prompts the user to run **Set Primary URL**.
4. **Service starts** — PostgreSQL initializes, Valkey starts, PeerTube starts with `PT_INITIAL_ROOT_PASSWORD` from `store.json`. On first boot PeerTube creates the `root` admin with that password.

---

## Configuration Management

Configuration is passed entirely through environment variables. There is no `production.yaml` managed by the package. Key variables:

| Variable                    | Source                        |
| --------------------------- | ----------------------------- |
| `PEERTUBE_DB_HOSTNAME`      | `localhost` (hardcoded)       |
| `PEERTUBE_DB_USERNAME`      | `peertube` (hardcoded)        |
| `PEERTUBE_DB_PASSWORD`      | `store.postgresPassword`      |
| `PEERTUBE_REDIS_HOSTNAME`   | `localhost` (hardcoded)       |
| `PEERTUBE_SECRET`           | `store.peertubeSecret`        |
| `PT_INITIAL_ROOT_PASSWORD`  | `store.adminPassword`         |
| `PEERTUBE_WEBSERVER_HOSTNAME` | parsed from `store.primaryUrl` |
| `PEERTUBE_WEBSERVER_PORT`   | parsed from `store.primaryUrl` |
| `PEERTUBE_WEBSERVER_HTTPS`  | parsed from `store.primaryUrl` |

`PT_INITIAL_ROOT_PASSWORD` is only applied by PeerTube on the very first database initialization. After that it is ignored. Rotating the admin password requires PeerTube's web interface.

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose                  |
| --------- | ---- | -------- | ------------------------ |
| Web UI    | 9000 | HTTP     | PeerTube web application |

---

## Actions (StartOS UI)

| Action              | Visibility | Allowed When | Description                                                        |
| ------------------- | ---------- | ------------ | ------------------------------------------------------------------ |
| Set Admin Password  | Enabled    | Any          | Shows stored root credentials. Generates on first call.            |
| Set Primary URL     | Enabled    | Any          | Pick which hostname PeerTube uses for video links and federation.  |

---

## Backups and Restore

**Included in backup:**

- PostgreSQL database (`pg_dump` via `sdk.Backups.withPgDump()`)
- `main` volume (uploads, config, store.json)

**Restore behavior:** pg_dump is restored into a fresh PostgreSQL instance. The `main` volume is restored in full including `store.json` (secrets carry over).

---

## Health Checks

| Check          | Method                | Daemon     |
| -------------- | --------------------- | ---------- |
| PostgreSQL     | `pg_isready -U peertube` | postgres |
| Valkey         | `valkey-cli ping`     | valkey     |
| Web Interface  | Port listening (9000) | peertube   |

The postgres and valkey checks are internal (`display: null`) and are only used for startup ordering. Only the Web Interface check is shown to the user.

---

## Dependencies

None. PostgreSQL and Valkey run as sidecars within this package.

---

## Limitations and Differences

1. **RTMP live streaming not exposed** — PeerTube supports RTMP on port 1935 for live streaming ingest, but StartOS does not currently support raw TCP port exposure. Live streaming via browser-based WebRTC still works.
2. **Admin password rotation** — `PT_INITIAL_ROOT_PASSWORD` only applies on first DB init. Rotate via PeerTube's web interface (Admin → Users → root → Change password).
3. **SMTP not pre-configured** — Configure email via PeerTube's admin panel (Admin → Configuration → Email).
4. **No riscv64 support** — The upstream `chocobozzz/peertube` image is not published for riscv64.

---

## What Is Unchanged from Upstream

The PeerTube container image is used unmodified (`chocobozzz/peertube:production`). No patches are applied. All configuration is injected via environment variables.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: peertube
containers:
  peertube:
    image: chocobozzz/peertube:v8.1.8
    mounts:
      - main/data -> /data
      - main/config -> /config
  postgres:
    image: postgres:17-alpine
    mounts:
      - db -> /var/lib/postgresql
  valkey:
    image: valkey/valkey:9-alpine
architectures: [x86_64, aarch64]
ports:
  ui: 9000
dependencies: none (postgres and valkey are sidecars)
store_json_keys:
  adminPassword: root account password (generated by setAdminPassword action)
  postgresPassword: internal postgres auth (generated on install)
  peertubeSecret: JWT/session secret (generated on install)
  primaryUrl: external URL for video links and federation
actions:
  set-admin-password: show/first-set root credentials
  set-primary-url: pick external URL
critical_tasks:
  - set-admin-password: blocks startup until admin password is set
  - set-primary-url: fires only if stored URL becomes unavailable
```
