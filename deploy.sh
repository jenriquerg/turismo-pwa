#!/bin/bash

# Script de despliegue para VPS
# Uso: ./deploy.sh [opción]
# Opciones:
#   build   - Solo construir las imágenes
#   up      - Levantar los servicios
#   restart - Reiniciar los servicios
#   logs    - Ver los logs
#   stop    - Detener los servicios

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que existe el archivo .env
if [ ! -f .env ]; then
    log_error "No se encontró el archivo .env"
    log_info "Copia .env.example a .env y configura tus variables:"
    log_info "cp .env.example .env"
    exit 1
fi

# Verificar que Docker está instalado
if ! command -v docker &> /dev/null; then
    log_error "Docker no está instalado"
    exit 1
fi

# Verificar que Docker Compose está instalado
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    log_error "Docker Compose no está instalado"
    exit 1
fi

# Cargar variables de entorno
log_info "Cargando variables de entorno..."
export $(cat .env | grep -v '^#' | xargs)

# Verificar variables críticas
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    log_error "Faltan variables de entorno críticas en .env"
    log_error "Asegúrate de que NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY estén configuradas"
    exit 1
fi

# Función para construir
build() {
    log_info "Construyendo imágenes Docker..."
    docker-compose build --no-cache
    log_info "Construcción completada"
}

# Función para levantar servicios
up() {
    log_info "Levantando servicios..."
    docker-compose up -d
    log_info "Servicios levantados"
    log_info "Aplicación disponible en: http://localhost"
    log_info "Usa './deploy.sh logs' para ver los logs"
}

# Función para reiniciar
restart() {
    log_info "Reiniciando servicios..."
    docker-compose restart
    log_info "Servicios reiniciados"
}

# Función para ver logs
logs() {
    docker-compose logs -f
}

# Función para detener
stop() {
    log_info "Deteniendo servicios..."
    docker-compose down
    log_info "Servicios detenidos"
}

# Función para despliegue completo
deploy() {
    log_info "Iniciando despliegue completo..."

    # Detener servicios existentes
    log_info "Deteniendo servicios existentes..."
    docker-compose down

    # Construir nuevas imágenes
    build

    # Levantar servicios
    up

    # Esperar a que la aplicación esté lista
    log_info "Esperando a que la aplicación esté lista..."
    sleep 5

    # Verificar health
    if curl -f http://localhost/health > /dev/null 2>&1; then
        log_info "Despliegue completado exitosamente!"
    else
        log_warn "La aplicación está corriendo pero el health check falló"
        log_info "Revisa los logs con: ./deploy.sh logs"
    fi
}

# Procesar comandos
case "${1:-deploy}" in
    build)
        build
        ;;
    up)
        up
        ;;
    restart)
        restart
        ;;
    logs)
        logs
        ;;
    stop)
        stop
        ;;
    deploy)
        deploy
        ;;
    *)
        log_error "Comando no reconocido: $1"
        echo "Uso: $0 {build|up|restart|logs|stop|deploy}"
        echo ""
        echo "Comandos:"
        echo "  build   - Solo construir las imágenes"
        echo "  up      - Levantar los servicios"
        echo "  restart - Reiniciar los servicios"
        echo "  logs    - Ver los logs en tiempo real"
        echo "  stop    - Detener los servicios"
        echo "  deploy  - Despliegue completo (por defecto)"
        exit 1
        ;;
esac
