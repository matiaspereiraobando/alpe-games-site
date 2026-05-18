#!/usr/bin/env bash
# ALPE Games — one-time VPS setup (Ubuntu). Run as root.
set -euo pipefail

DEPLOY_USER="${DEPLOY_USER:-deploy}"
WEB_ROOT="/var/www/alpegames"

echo "==> Creating deploy user"
if ! id "$DEPLOY_USER" &>/dev/null; then
  useradd -m -s /bin/bash "$DEPLOY_USER"
fi

echo "==> Creating web directories"
mkdir -p "$WEB_ROOT/site" "$WEB_ROOT/games"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$WEB_ROOT"

echo "==> Placeholder pages"
echo '<!DOCTYPE html><html><body><h1>ALPE Games — catalog coming soon</h1></body></html>' \
  > "$WEB_ROOT/site/index.html"
mkdir -p "$WEB_ROOT/games/hello-world"
echo '<!DOCTYPE html><html><body><h1>Hello World game slot</h1></body></html>' \
  > "$WEB_ROOT/games/hello-world/index.html"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$WEB_ROOT"

echo "==> Installing Caddy"
apt-get update -qq
apt-get install -y -qq debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt-get update -qq
apt-get install -y -qq caddy

echo "==> Installing Caddyfile"
if [ -f "./Caddyfile" ]; then
  cp ./Caddyfile /etc/caddy/Caddyfile
else
  cat > /etc/caddy/Caddyfile <<'CADDY'
gamejam.alpegames.cl {
	root * /var/www/alpegames/site
	file_server

	handle_path /games/* {
		root * /var/www/alpegames/games
		try_files {path} {path}/index.html
		file_server
	}
}
CADDY
fi

systemctl enable caddy
systemctl reload caddy || systemctl restart caddy

echo "==> Firewall (ufw)"
if command -v ufw &>/dev/null; then
  ufw allow OpenSSH
  ufw allow 80/tcp
  ufw allow 443/tcp
  ufw --force enable || true
fi

echo "==> Done. Add deploy user's SSH key, then configure GitHub Actions secrets."
echo "    Web root: $WEB_ROOT"
echo "    Domain:   https://gamejam.alpegames.cl"
