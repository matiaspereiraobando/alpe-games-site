---
layout: ../../layouts/BlogPost.astro
title: Hello World — pipeline validation
description: What we learned shipping the first ALPE Games deploy pipeline.
date: 2026-05-17
---

This isn't a "real" jam game—it's the **smoke test** for our studio pipeline.

## What we validated

- Phaser 3 + Vite build with path base `/games/hello-world/`
- GitHub Actions rsync deploy to the VPS
- Catalog registry entry + iframe embed on `gamejam.alpegames.cl`

## What went well

- Path-based hosting keeps Caddy config stable across cycles.
- TypeScript-first Phaser works well with Cursor-assisted iteration.

## What to improve next cycle

- Add a one-command `new-game` scaffold script.
- Add Playwright smoke test in CI (click orb, score increases).

## Scope (Day 0)

1. One clickable target
2. Score counter
3. Deploy to production URL
4. Catalog page with iframe
