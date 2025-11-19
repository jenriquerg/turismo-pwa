#!/bin/bash

# Script para limpiar el archivo .env corrupto en el servidor

cd ~/apps/turismo-pwa

echo "Cleaning up corrupted .env file..."

# Backup si existe
if [ -f .env ]; then
  mv .env .env.corrupted.backup
  echo "Backed up corrupted .env to .env.corrupted.backup"
fi

# Crear .env limpio con valores por defecto
echo "BLUE_TAG=latest" > .env
echo "GREEN_TAG=latest" >> .env
echo "ACTIVE_ENV=blue" >> .env

echo "Created clean .env file:"
cat .env

echo "Cleanup complete!"
