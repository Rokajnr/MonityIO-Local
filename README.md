# Monityio Monorepo

Welcome to the Monityio project workspace. This repository contains both the frontend (Next.js) and the backend (Strapi API).

## Project Structure

- **[client](./client/)**: The frontend React app built with Next.js.
- **[server](./server/)**: The backend API built with Strapi.

---

## Getting Started

### 1. First-Time Setup

Before running the project, you need to install the dependencies for the root environment and each individual project:

```bash
# 1. Install root runner dependencies (e.g., concurrently)
npm install

# 2. Install client dependencies
npm install --prefix client

# 3. Install server dependencies
npm install --prefix server
```

### 2. Environment Variables

Make sure you copy the example environment files and set the appropriate configuration:

- For client: `cp client/.env.local.example client/.env.local`
- For server: `cp server/.env.example server/.env`

### 3. Seed the Database

The backend uses **SQLite** for local development. The database file (`server/.tmp/data.db`) is **not** committed — each dev regenerates it from the seed data tracked in git:

```bash
npm run seed:example --prefix server   # builds server/.tmp/data.db from server/data/data.json
```

The seed runs **once** (it sets an `initHasRun` flag). To re-seed after the seed data changes, wipe the local DB first:

```bash
rm server/.tmp/data.db && npm run seed:example --prefix server
```

---

## Database & Sharing Changes

Never commit the `.db` file. Database changes are shared three ways depending on what changed:

- **Schema (structure)** — committed automatically as `schema.json` files under `server/src/api/**/content-types/`. On the next `npm run dev`, Strapi auto-syncs each dev's local DB to match. No binary DB is exchanged.
- **Baseline content (rows)** — add records to `server/data/data.json` (and images to `server/data/uploads/`), commit, and teammates re-seed.
- **Complex transforms** — add a migration to `server/database/migrations/`; Strapi runs pending ones on startup.

See **[server/README.md](./server/README.md#-sharing-database-changes-between-devs)** for the full explanation.

---

## Running in Development

To start both the Next.js client and the Strapi server concurrently in development mode, run the following command in the **root directory**:

```bash
npm run dev
```

This will spin up:

- Next.js development server at: [http://localhost:3000](http://localhost:3000)
- Strapi development server at: [http://localhost:1337](http://localhost:1337)
- Strapi Admin Dashboard at: [http://localhost:1337/admin](http://localhost:1337/admin)

All outputs from both servers will be multiplexed in your terminal and color-coded:

- `[client]` logs will be in **cyan**.
- `[server]` logs will be in **magenta**.

---

## Production Deployment (nvm + pm2)

Deployment runs both apps directly on the host with **nvm** (Node version) and
**pm2** (process manager) — no Docker. The Node version is pinned in
[`.nvmrc`](./.nvmrc) and the processes are defined in
[`ecosystem.config.js`](./ecosystem.config.js).

GitHub Actions (`.github/workflows/deploy-cms.yml` and `deploy-website.yml`) SSH
into the server on each push to `main`, pull the code, build the affected app,
and `pm2 reload` it. The steps below describe the **one-time host setup** these
workflows assume.

### 1. Host prerequisites

- [nvm](https://github.com/nvm-sh/nvm) installed for the deploy user.
- A running MySQL instance reachable on `127.0.0.1:3306`.
- The repo cloned to the path referenced by the `REMOTE_PATH` GitHub secret.

pm2 is **not** required globally — it is a project dependency and is invoked via
`npx pm2` (installed by `npm ci` during deploy).

### 2. Configure production environment variables

Secrets live in per-app `.env` files on the host (git-ignored, never passed
through CI). Copy the examples and fill in real values:

```bash
cp server/.env.production.example server/.env   # Strapi auto-loads server/.env
cp client/.env.production.example client/.env.production
```

Strapi reads `server/.env` and Next.js reads `client/.env.production`
automatically. Note that `NEXT_PUBLIC_*` values are inlined at **build** time, so
changing them requires a rebuild (every deploy rebuilds).

### 3. First start

From the repo root, with the pinned Node version active:

```bash
nvm install            # reads .nvmrc
npm ci                 # installs pm2 and root tooling
npm ci --prefix server && npm run build --prefix server
npm ci --prefix client && npm run build --prefix client

npm run pm2:start      # pm2 start ecosystem.config.js
npx pm2 save           # persist the process list
npx pm2 startup        # print the command to enable pm2 on boot (run it once)
```

Both apps bind to `127.0.0.1` only (server `:1337`, client `:3000`); put a
reverse proxy (nginx/Caddy) in front for TLS and public access.

### Handy pm2 commands

```bash
npm run pm2:status     # process list
npm run pm2:logs       # tail logs
npm run pm2:reload     # reload both apps with refreshed env
```

---
