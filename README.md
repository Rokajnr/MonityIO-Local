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

## Docker Deployment

To deploy the application (Next.js frontend and Strapi backend) using Docker:

### 1. Configure Production Environment Variables

Copy the production environment example file to the root `.env` (or configure the equivalent variables on your host/CI environment):

```bash
cp .env.production.example .env
```

Ensure all database connection parameters for your running MySQL instance are populated:

* `DATABASE_CLIENT`: Set to `mysql` (default in Docker)
* `DATABASE_HOST`: Set to your MySQL host (use `host.docker.internal` if the database runs on the same Docker host machine)
* `DATABASE_PORT`: MySQL port (typically `3306`)
* `DATABASE_NAME`: Name of your Strapi database
* `DATABASE_USERNAME`: Database username
* `DATABASE_PASSWORD`: Database password

Also fill in the secret keys and token salts needed for Strapi and the domain/URL variables for Next.js.

### 2. Start the Services

Build and run the Docker containers in the background:

```bash
docker compose up -d --build
```

This will build the images for both the frontend client and backend server, configure them, and start the containers.

---

