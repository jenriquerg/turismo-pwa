#!/bin/bash

TARGET_ENV=$1
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
APP_DIR="$(dirname "$SCRIPT_DIR")"

if [ -z "$TARGET_ENV" ] || { [ "$TARGET_ENV" != "blue" ] && [ "$TARGET_ENV" != "green" ]; }; then
    echo "Error: Usa blue o green"
    exit 1
fi

cp "$APP_DIR/nginx-upstream.conf" "$APP_DIR/nginx-upstream.conf.backup"

if [ "$TARGET_ENV" = "blue" ]; then
    TARGET_CONTAINER="app-blue:3000"
else
    TARGET_CONTAINER="app-green:3000"
fi

cat > "$APP_DIR/nginx-upstream.conf" <<EOF
upstream nextjs {
    server $TARGET_CONTAINER;
    keepalive 32;
}
EOF

docker exec nginx-proxy nginx -t
if [ $? -ne 0 ]; then
    echo "Error en configuración de nginx"
    mv "$APP_DIR/nginx-upstream.conf.backup" "$APP_DIR/nginx-upstream.conf"
    exit 1
fi

docker exec nginx-proxy nginx -s reload
if [ $? -ne 0 ]; then
    echo "Error al recargar nginx"
    mv "$APP_DIR/nginx-upstream.conf.backup" "$APP_DIR/nginx-upstream.conf"
    exit 1
fi

sed -i "s/ACTIVE_ENV=.*/ACTIVE_ENV=$TARGET_ENV/" "$APP_DIR/.env"

echo "Tráfico cambiado a $TARGET_ENV"
docker ps --filter "name=turismo-pwa" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
