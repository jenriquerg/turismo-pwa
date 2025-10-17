# Resumen del Proyecto - PWA Turismo

Este documento explica de forma simple qué tiene tu proyecto y dónde encontrar cada cosa.

## 1. Configuración del entorno de desarrollo 

### ¿Qué es?
Son los archivos que configuran cómo funciona tu aplicación.

### ¿Dónde está?
- **package.json** (línea 1-31): Lista todas las librerías que usa el proyecto
  - Next.js 15.5.5 (framework principal)
  - Supabase (base de datos)
  - React 19 (interfaz de usuario)
  - next-pwa (para convertir en PWA)

- **next.config.js** (línea 1-48): Configuración de Next.js y PWA
  - Configuración de caché para imágenes
  - Configuración de caché para API de Supabase
  - Service Worker activado

- **.env.example**: Plantilla para variables de entorno
  - Define qué credenciales necesitas de Supabase

### ¿Cómo se prueba?
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

---

## 2. Repository Pattern y conexión con backend ✅

### ¿Qué es?
Son clases que se encargan de hablar con la base de datos de Supabase.

### ¿Dónde está?

#### BaseRepository (src/repositories/BaseRepository.ts)
**Línea 5-99**: Clase base con operaciones comunes
- findAll() - Traer todos los registros
- findById(id) - Buscar por ID
- create(data) - Crear nuevo registro
- update(id, data) - Actualizar registro
- delete(id) - Eliminar registro

#### AlojamientoRepository (src/repositories/AlojamientoRepository.ts)
**Línea 8-70**: Operaciones específicas para alojamientos
- findDisponibles() - Buscar alojamientos disponibles
- findByUbicacion(ubicacion) - Buscar por ciudad
- findByCapacidad(capacidad) - Buscar por número de personas

#### ReservaRepository (src/repositories/ReservaRepository.ts)
**Línea 9-66**: Operaciones para reservas
- findByUserId(userId) - Reservas de un usuario
- findByEstado(estado) - Filtrar por estado
- updateEstado(id, estado) - Cambiar estado de reserva

#### ResenaRepository (src/repositories/ResenaRepository.ts)
**Línea 9-72**: Operaciones para reseñas
- findByServicioId(servicioId) - Reseñas de un servicio
- getPromedioCalificacion(servicioId) - Promedio de estrellas
- getEstadisticas(servicioId) - Estadísticas completas

---

## 3. Factory Pattern y clases de modelo ✅

### ¿Qué es?
Clases que te ayudan a crear objetos correctamente validados.

### ¿Dónde está?

#### Tipos y Modelos (src/types/index.ts)
**Línea 1-140**: Definiciones de todos los tipos de datos
- Enums: ReservaEstado, TipoServicio, TipoExperiencia
- Interfaces: Usuario, Alojamiento, Reserva, Resena

#### ServicioTuristicoFactory (src/factories/ServicioTuristicoFactory.ts)
**Línea 12-103**: Crea y valida servicios turísticos
- createAlojamiento(params) - Valida título, precio, capacidad
- createAlimento(params) - Valida nombre, precio
- createExperiencia(params) - Valida título, duración

#### ReservaFactory (src/factories/ReservaFactory.ts)
**Línea 17-149**: Crea y valida reservas
- createReservaAlojamiento(params) - Calcula noches y precio
- createReservaAlimento(params) - Calcula precio por cantidad
- createReservaExperiencia(params) - Calcula precio total

---

## 4. Estructura MVC ✅

### ¿Qué es?
Organización del código en Modelo-Vista-Controlador

### ¿Dónde está?

#### Modelos (M): src/types/
#### Vistas (V): src/app/
#### Controladores (C): src/controllers/

**AlojamientoController** (src/controllers/AlojamientoController.ts)
- getAll(), getDisponibles(), getById()
- create(), update(), delete()
- searchByUbicacion(), searchByCapacidad()

**ReservaController** (src/controllers/ReservaController.ts)
- create(), getByUserId(), getActivasByUserId()
- updateEstado(), cancelar(), confirmar()

**ResenaController** (src/controllers/ResenaController.ts)
- create(), getByServicioId(), getByUserId()
- getPromedio(), getEstadisticas()

---

## 5. Endpoints de alojamientos ✅

### API Routes creadas:

**GET /api/alojamientos** (src/app/api/alojamientos/route.ts)
- Sin params: Todos los alojamientos
- ?disponible=true: Solo disponibles
- ?ubicacion=Cali: Buscar por ubicación
- ?capacidad=4: Buscar por capacidad

**POST /api/alojamientos**: Crear alojamiento

**GET /api/alojamientos/[id]**: Obtener uno
**PUT /api/alojamientos/[id]**: Actualizar
**DELETE /api/alojamientos/[id]**: Eliminar

---

## 6. Sistema de reservas ✅

### API Routes:

**GET /api/reservas?userId=xxx** (src/app/api/reservas/route.ts)
- Obtener reservas de usuario
- ?activas=true: Solo activas

**POST /api/reservas**: Crear reserva

**GET /api/reservas/[id]**: Obtener una reserva
**PATCH /api/reservas/[id]**: Actualizar estado
**DELETE /api/reservas/[id]**: Eliminar

---

## 7. Sistema de reseñas ✅

### API Routes:

**GET /api/resenas** (src/app/api/resenas/route.ts)
- ?servicioId=abc: Reseñas de un servicio
- ?userId=xyz: Reseñas de un usuario
- ?servicioId=abc&estadisticas=true: Estadísticas

**POST /api/resenas**: Crear reseña

**DELETE /api/resenas/[id]**: Eliminar reseña

---

## Estructura de carpetas

```
turismo-pwa/
├── .env.example
├── package.json
├── next.config.js
├── src/
│   ├── app/                     (VISTAS)
│   │   ├── api/
│   │   │   ├── alojamientos/
│   │   │   ├── reservas/
│   │   │   └── resenas/
│   │   ├── login/
│   │   └── registro/
│   ├── types/                   (MODELOS)
│   ├── controllers/             (CONTROLADORES)
│   ├── repositories/            (REPOSITORY PATTERN)
│   ├── factories/               (FACTORY PATTERN)
│   └── lib/supabase/            (CONEXIÓN BACKEND)
```

---

## Pasos siguientes

1. Crear archivo .env.local con credenciales de Supabase
2. Crear tablas en Supabase
3. Probar endpoints con Postman
4. Crear componentes de UI

---

## Comandos útiles

```bash
npm install     # Instalar
npm run dev     # Desarrollar
npm run build   # Compilar
```
