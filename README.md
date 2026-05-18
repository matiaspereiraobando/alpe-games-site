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

## Team workflow

- [WORKFLOW.md](WORKFLOW.md) — branches, roles, multi-agent rules
- [CYCLE-1.md](CYCLE-1.md) — Day 0 → Ship checklist
- [SLACK.md](SLACK.md) — Slack channels, bug intake, deploy notifications
- [AUTOMATION-ROADMAP.md](AUTOMATION-ROADMAP.md) — Phase 1.5+ Cursor SDK plan

## URL layout

| Path | Served by | Purpose |
|------|-----------|---------|
| `/games/{slug}/` | VPS `games/` folder | Playable build (iframe `embed.url`) |
| `/jam/{slug}/` | Astro catalog | Game page with embed + postmortem links |
| `/games/` | Astro | Game index |

## Adding a shipped game

1. Deploy the game repo to `https://gamejam.alpegames.cl/games/{slug}/`
2. Add an entry to `games.registry.json` (`embed.url` = play URL above)
3. Add postmortem markdown under `src/pages/blog/` if desired
4. Open PR → merge → catalog redeploys
