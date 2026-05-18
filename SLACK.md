# Slack setup for ALPE Games

This guide stands up the Phase 1 Slack workspace for a two-person studio: notifications, bug intake, and sprint reminders. See [WORKFLOW.md](WORKFLOW.md) for how channels are used day-to-day.

## 1. Channels to create

| Channel | Purpose | Who posts |
|---------|---------|-----------|
| `#alpe-game-lab` | Daily coordination, theme, scope cuts | Team |
| `#alpe-builds` | Deploys, workflow runs, production URLs | GitHub app, Actions |
| `#alpe-bugs` | Playtest bug reports | Bug-report Workflow, manual |
| `#alpe-agent-log` | Cursor agent summaries, PR links | Manual now, automation in Phase 1.5 |

Add both team members to all four. Keep them public so future contributors can join without an invite.

## 2. GitHub for Slack

Install once per workspace, then subscribe each repo into `#alpe-builds`.

1. Install [GitHub for Slack](https://slack.github.com/).
2. In `#alpe-builds` run:
   ```
   /github subscribe matiaspereiraobando/alpe-games-site
   /github subscribe matiaspereiraobando/alpe-phaser-game-template
   /github subscribe matiaspereiraobando/alpe-hello-world
   ```
3. Tune what you see (deploys + PRs + issues are usually enough):
   ```
   /github subscribe matiaspereiraobando/alpe-games-site pulls issues deployments commits:main releases workflows
   ```
4. For every new game repo, repeat step 2 with the new repo name.

Bugs, PRs, and Actions failures will then appear in `#alpe-builds`.

## 3. Bug report Workflow (`#alpe-bugs`)

Use Slack **Workflow Builder** → **New workflow** → trigger **From a link in Slack** (or shortcut menu).

### Form fields

| Field | Type | Required |
|-------|------|----------|
| Game slug | Short answer (e.g. `orbit-drift-01`) | Yes |
| URL where bug happened | Short answer | Yes |
| Browser / device | Short answer | Yes |
| What you expected | Long answer | Yes |
| What actually happened | Long answer | Yes |
| Screenshot / video | File upload | No |
| Severity | Single select: `blocker`, `major`, `minor` | Yes |

### Step: post message to `#alpe-bugs`

Format the message so it's easy to copy into a GitHub issue:

```
*Bug report — :game_slug:*
URL: :url:
Browser: :browser:
Expected: :expected:
Actual: :actual:
Severity: :severity:
Reporter: :submitter:
```

Pin the workflow's shortcut to the channel topic so playtesters can find it.

### Optional: auto-create GitHub issue

In Workflow Builder, add a **Send a webhook** step targeting a small relay (defer to Phase 1.5). For Phase 1, copy the Slack message into a new GitHub issue by hand using the [Bug Report](#) issue template.

## 4. Sprint reminders (`#alpe-game-lab`)

Create four scheduled Workflow Builder messages per cycle. Use a 10-day cadence as the default; shift by a day or two as needed.

| Day | Message |
|-----|---------|
| 0 | "Cycle kickoff: lock scope (max 5 bullets). Pitch in this thread." |
| 5 | "Mid-cycle: is the core loop playable end-to-end? If not, cut now." |
| 9 | "Ruthless cut day. Freeze features. Only critical fixes from here." |
| 12 | "Ship checklist time — see CYCLE-1.md." |

Each one links back to `WORKFLOW.md` / `CYCLE-1.md` so a click takes you to the checklist.

## 5. Deploy notifications (`#alpe-builds`)

Two sources land here:

1. **GitHub for Slack** posts on every deploy workflow run (passes/fails).
2. **`SLACK_WEBHOOK_URL` secret** in each repo sends a custom success message with the production URL. The deploy workflows in `alpe-games-site`, `alpe-phaser-game-template`, and any new game repo already use this when the secret is set.

To enable the custom messages:

1. In `#alpe-builds`, **+ Add apps** → **Incoming Webhooks** → create a webhook for the channel.
2. Copy the webhook URL.
3. In each GitHub repo: **Settings → Secrets and variables → Actions → New repository secret** named `SLACK_WEBHOOK_URL`.
4. Trigger a deploy; the message arrives in `#alpe-builds`.

If you want them in `#alpe-agent-log` instead, create the webhook there.

## 6. Cursor agent summaries (`#alpe-agent-log`)

In Phase 1 this is **manual**: after a Cursor agent finishes a task, the person who launched it posts:

```
Agent task: <issue link>
PR: <PR link>
Branch: <branch name>
Build: green / red
Notes: <one or two lines>
```

A pinned Slack template message saves time. Phase 1.5 replaces this with the Cursor SDK posting automatically — see [AUTOMATION-ROADMAP.md](AUTOMATION-ROADMAP.md).

## 7. Notification settings (recommended)

To avoid burnout in `#alpe-builds`:

- Mute the channel; rely on the unread badge.
- Keep `#alpe-bugs` and `#alpe-game-lab` on regular notifications.
- For the merge owner of the cycle: keep `#alpe-builds` notifications on so deploy failures get caught quickly.

## 8. Quick checklist

- [ ] Channels created and both members joined
- [ ] GitHub for Slack installed and 3 repos subscribed in `#alpe-builds`
- [ ] Bug report Workflow live in `#alpe-bugs` with shortcut pinned
- [ ] Four sprint reminders scheduled in `#alpe-game-lab`
- [ ] `SLACK_WEBHOOK_URL` secret set on all repos
- [ ] Agent-log message template pinned in `#alpe-agent-log`
