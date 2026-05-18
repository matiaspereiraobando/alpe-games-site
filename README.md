# alpe-games-site

Catalog site for **ALPE Games** — [gamejam.alpegames.cl](https://gamejam.alpegames.cl).

## Develop

```powershell
cd D:\MATIAS\PROJECTS\alpe-games\alpe-games-site
npm install
npm run dev
```

Open http://localhost:4321

## Registry

Edit [`data/games.registry.json`](data/games.registry.json). Validate:

```powershell
npm run validate:registry
```

## Deploy

Push to `main`. GitHub Actions builds and rsyncs `dist/` to the VPS.

Required secrets: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_SITE_PATH`, optional `SLACK_WEBHOOK_URL`.

VPS setup: see [`infra/README.md`](infra/README.md).

## Adding a shipped game

1. Deploy the game repo to `https://gamejam.alpegames.cl/games/{slug}/`
2. Add an entry to `games.registry.json`
3. Add postmortem markdown under `src/pages/blog/` if desired
4. Open PR → merge → catalog redeploys
