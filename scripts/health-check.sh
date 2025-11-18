#!/bin/bash

APP_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
cd "$APP_DIR"

BLUE_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health)
echo "Blue: $BLUE_HEALTH"

GREEN_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/health)
echo "Green: $GREEN_HEALTH"

NGINX_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/health)
echo "Nginx: $NGINX_HEALTH"

ACTIVE=$(grep ACTIVE_ENV .env | cut -d'=' -f2)
echo "Activo: $ACTIVE"

docker ps --filter "name=turismo-pwa" --format "table {{.Names}}\t{{.Status}}"
