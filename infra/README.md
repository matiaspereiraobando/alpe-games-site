# ALPE Games VPS infrastructure

Target: **gamejam.alpegames.cl** on Hostinger Ubuntu VPS.

## DNS

At your `alpegames.cl` registrar:

| Type | Name | Value |
|------|------|-------|
| A | gamejam | `<VPS_IP>` |

Wait for propagation, then continue.

## One-time VPS setup

SSH as root, then:

```bash
curl -fsSL https://raw.githubusercontent.com/matiaspereiraobando/alpe-games-site/main/infra/setup-vps.sh -o setup-vps.sh
# Or copy infra/setup-vps.sh from this repo manually:
bash setup-vps.sh
```

Or copy `infra/setup-vps.sh` and `infra/Caddyfile` from `alpe-games-site` after cloning.

## Directory layout

```text
/var/www/alpegames/
├── site/          # Catalog (Astro build)
└── games/
    └── hello-world/
```

## Caddy

Config at `/etc/caddy/Caddyfile` — catalog at `/` and `/games/`; playable builds at `/games/{slug}/` only (see `infra/Caddyfile`).

## Deploy user

- User: `deploy`
- Add your GitHub Actions public key to `/home/deploy/.ssh/authorized_keys`
- CI rsyncs builds; no root SSH in Actions.

## Verify

```bash
curl -I https://gamejam.alpegames.cl/
curl -I https://gamejam.alpegames.cl/games/hello-world/
```
