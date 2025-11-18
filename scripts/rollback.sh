#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
APP_DIR="$(dirname "$SCRIPT_DIR")"
cd "$APP_DIR"

CURRENT_ENV=$(grep ACTIVE_ENV .env | cut -d'=' -f2)

if [ "$CURRENT_ENV" = "blue" ]; then
    ROLLBACK_ENV="green"
else
    ROLLBACK_ENV="blue"
fi

echo "Rollback a $ROLLBACK_ENV"
read -p "Confirmar? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Cancelado"
    exit 0
fi

./scripts/switch-traffic.sh $ROLLBACK_ENV
if [ $? -eq 0 ]; then
    echo "Rollback completado"
else
    echo "Error en rollback"
fi
