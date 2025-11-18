#!/bin/bash

# Script de inicialización para Blue-Green Deployment
# Ejecutar en el VPS la primera vez

set -e

echo "==================================="
echo "Setup Blue-Green Deployment - Turismo PWA"
echo "==================================="
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "docker-compose.yml" ]; then
    echo "Error: docker-compose.yml no encontrado"
    echo "Ejecuta este script desde el directorio ~/apps/turismo-pwa"
    exit 1
fi

# Crear archivo .env si no existe
if [ ! -f ".env" ]; then
    echo "Creando archivo .env..."
    cat > .env <<EOF
GITHUB_REPOSITORY=tu-usuario/turismo-pwa
BLUE_TAG=latest
GREEN_TAG=latest
ACTIVE_ENV=blue
EOF
    echo "✓ Archivo .env creado"
    echo ""
    echo "IMPORTANTE: Edita el archivo .env y configura GITHUB_REPOSITORY con tu usuario/repositorio"
    echo ""
    read -p "Presiona Enter para continuar..."
fi

# Verificar que GITHUB_REPOSITORY esté configurado
source .env
if [ "$GITHUB_REPOSITORY" = "tu-usuario/turismo-pwa" ]; then
    echo "Error: Debes configurar GITHUB_REPOSITORY en el archivo .env"
    exit 1
fi

echo "Configuración actual:"
echo "  GITHUB_REPOSITORY: $GITHUB_REPOSITORY"
echo "  BLUE_TAG: $BLUE_TAG"
echo "  GREEN_TAG: $GREEN_TAG"
echo "  ACTIVE_ENV: $ACTIVE_ENV"
echo ""

# Hacer ejecutables los scripts
echo "Haciendo ejecutables los scripts..."
chmod +x scripts/*.sh
echo "✓ Scripts configurados"
echo ""

# Pull de las imágenes
echo "Descargando imágenes Docker..."
docker compose pull
echo "✓ Imágenes descargadas"
echo ""

# Iniciar contenedores
echo "Iniciando contenedores Blue y Green..."
docker compose up -d
echo "✓ Contenedores iniciados"
echo ""

# Esperar que los contenedores estén listos
echo "Esperando que los contenedores estén listos (30 segundos)..."
sleep 30

# Verificar health checks
echo ""
echo "Verificando health checks..."
./scripts/health-check.sh

echo ""
echo "==================================="
echo "Setup completado exitosamente!"
echo "==================================="
echo ""
echo "Siguiente paso:"
echo "  - Visita http://$(curl -s ifconfig.me) para ver tu aplicación"
echo "  - El entorno activo es: $ACTIVE_ENV"
echo ""
echo "Comandos útiles:"
echo "  ./scripts/health-check.sh     - Verificar estado de todos los contenedores"
echo "  ./scripts/switch-traffic.sh blue|green  - Cambiar tráfico entre entornos"
echo "  ./scripts/rollback.sh         - Volver al entorno anterior"
echo ""
