# ALPE Games — Cycle 1 kickoff

Use this when you start your first real 10–15 day jam (after hello-world pipeline is live).

Reference: [WORKFLOW.md](WORKFLOW.md) for branch/agent rules. [SLACK.md](SLACK.md) for channel setup.

## Day 0 checklist

- [ ] Pick theme + one-sentence pitch (post in `#alpe-game-lab`)
- [ ] Run `.\scripts\new-game.ps1 -Slug "<slug>" -Cycle 1 -Title "<title>"`
- [ ] Set `GAME_SLUG`, `GAME_BASE_PATH`, `game.manifest.json`
- [ ] Commit README scope (5 bullets max — template below)
- [ ] Create 3–6 GitHub issues only (see "Day 0 issues")
- [ ] Assign issue owners (game lead vs support lead)
- [ ] Invite co-founder as GitHub collaborator on the new repo
- [ ] Subscribe the new repo in Slack: `/github subscribe matiaspereiraobando/<repo>` in `#alpe-builds`
- [ ] Add `SLACK_WEBHOOK_URL` and VPS secrets to the new repo's Actions settings

## README scope template

```markdown
## Scope (Day 0)
1. Core mechanic:
2. Session length target (60–120s):
3. One juice item:
4. Mobile-safe: yes/no
5. OUT of scope:
```

## Day 0 issues (create these only)

Pick the minimal set; one or two can be skipped if the game is tiny.

| Title | Owner | Branch |
|-------|-------|--------|
| Core loop playable end-to-end | Game lead | `game/core-mechanic` |
| Controls + game over screen | Game lead | `game/core-mechanic` |
| One juice item (sfx, particles, screen shake) | Support lead | `game/polish-pass` |
| Deploy verification (`/games/{slug}/` loads) | Either | `main` (CI only) |
| Catalog registry entry + postmortem | Support lead | n/a (catalog repo PR) |

Anything not in these issues is **out of scope** for the cycle.

## Roles (rotate next cycle)

| Days | Game lead | Support lead |
|------|-----------|--------------|
| 0 | Theme, scope, issues | Engine/scope sanity check |
| 1–4 | Core branch implementation | Playtest, file bugs |
| 5–8 | Lead code | Polish branch (juice + tuning) |
| 9–11 | Bug bash + ruthless cut | Performance/size, mobile test |
| 12–14 | Deploy + final merges | Catalog PR + postmortem + screenshots |

## Cursor agent checklist (before launching a task)

- [ ] There is a GitHub issue with a clear scope.
- [ ] The issue is on a known branch (or "create branch `agent/<num>-<slug>`").
- [ ] The agent is told **what NOT to touch**.
- [ ] The PR title mentions the issue number.
- [ ] Build is green before merging.

## Ship checklist (Days 13–15)

- [ ] `npm run build` green
- [ ] Game live at `https://gamejam.alpegames.cl/games/{slug}/`
- [ ] Registry PR merged on `alpe-games-site`
- [ ] Postmortem in `src/pages/blog/{slug}.md`
- [ ] Catalog page reachable at `https://gamejam.alpegames.cl/jam/{slug}/`
- [ ] Release post in `#alpe-game-lab` with play URL + 1-paragraph recap

## Ruthless cut (Day 9)

Ask: *Can a stranger play one complete session without instructions we didn't build?*

If no — cut until yes. Convert remaining ideas into `scope-cut` labelled GitHub issues for a future cycle; do not delete them.
