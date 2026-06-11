# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## 🌱 Local Setup & Seeding

We use **SQLite** for local development. The database file (`.tmp/data.db`) is **not** committed — every dev regenerates it from the seed data tracked in git.

First-time setup:

```bash
npm install
cp .env.example .env   # then fill in the APP_KEYS / token secrets
npm run seed:example   # builds .tmp/data.db from data/data.json + data/uploads
npm run develop
```

The seed only runs **once** — it sets an `initHasRun` flag in the DB. To re-seed after the seed data changes, wipe your local DB first:

```bash
rm .tmp/data.db && npm run seed:example
```

## 🔄 Sharing database changes between devs

There are two kinds of "database changes" — treat them differently:

### 1. Schema changes (structure) — shared via git automatically

When you add or edit a content-type (e.g. add a field to **Article**) through the admin panel in `develop` mode, Strapi writes the change to a **`schema.json`** file under `src/api/<name>/content-types/<name>/schema.json`. These files _are_ the schema and are committed to git.

```
src/api/article/content-types/article/schema.json   ← the "Article" table definition
```

Workflow:

1. You change a content-type → Strapi updates the `schema.json` → commit it.
2. A teammate runs `git pull` then `npm run develop`.
3. On boot, Strapi diffs the `schema.json` files against their DB and **auto-syncs the schema** (adds columns, tables, relations). No manual migration needed for standard changes.

> Because the schema lives in code, schema changes are reviewed in PRs like any other code — no binary `.db` is ever exchanged.

### 2. Data changes (rows) — not auto-shared

Editing actual content (creating articles, changing values) only touches _your_ local `.tmp/data.db`. That data is **not** shared by git. Options, in order of preference:

- **Fixtures for everyone:** add the records to `data/data.json` (and any images to `data/uploads/`), commit them. Teammates re-seed (`rm .tmp/data.db && npm run seed:example`) to pick them up.
- **Moving a richer dataset:** use Strapi's built-in Data Transfer to produce/load a portable archive:

  ```bash
  npm run strapi export -- --no-encrypt --file backup   # → backup.tar.gz
  npm run strapi import -- --file backup.tar.gz
  ```

### 3. Custom data migrations (advanced)

For changes the auto-sync can't express (backfilling a new column, renaming with data transforms), add a migration file to **`database/migrations/`**. Strapi runs pending migrations in that folder on startup, in filename order. Commit these so they run for everyone.

> **Rule of thumb:** never commit `.tmp/data.db`. Share _structure_ via `schema.json` (git), _baseline data_ via `data/data.json` (seed), and _complex transforms_ via `database/migrations/`.

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
