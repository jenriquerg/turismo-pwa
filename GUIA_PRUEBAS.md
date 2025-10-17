# Guía de Pruebas - API Turismo PWA

## Configuración Inicial

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Supabase

1. Ve a https://app.supabase.com
2. Crea un nuevo proyecto
3. Ve a "SQL Editor" y pega todo el contenido de `supabase-setup.sql`
4. Ejecuta el script (esto crea las tablas y datos de prueba)

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

**¿Dónde encuentro estas credenciales?**
- En Supabase, ve a "Settings" > "API"
- Copia "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
- Copia "anon public" → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Iniciar el servidor

```bash
npm run dev
```

✅ Tu servidor estará corriendo en **http://localhost:3000**

---

## Probar los Endpoints

Sí, con `npm run dev` ya puedes hacer solicitudes. Usa **http://localhost:3000** como base.

### Opción 1: Desde el navegador (GET requests)

Abre tu navegador y visita estas URLs:

```
http://localhost:3000/api/alojamientos
http://localhost:3000/api/alojamientos?disponible=true
http://localhost:3000/api/alojamientos?ubicacion=Cali
```

Deberías ver JSON con los datos!

### Opción 2: Con cURL (Terminal)

#### ALOJAMIENTOS

**Obtener todos los alojamientos:**
```bash
curl http://localhost:3000/api/alojamientos
```

**Solo disponibles:**
```bash
curl http://localhost:3000/api/alojamientos?disponible=true
```

**Buscar por ubicación:**
```bash
curl http://localhost:3000/api/alojamientos?ubicacion=Cali
```

**Buscar por capacidad:**
```bash
curl http://localhost:3000/api/alojamientos?capacidad=4
```

**Obtener un alojamiento específico:**
```bash
# Primero obtén un ID de la lista de alojamientos, luego:
curl http://localhost:3000/api/alojamientos/[ID-AQUI]
```

**Crear un alojamiento:**
```bash
curl -X POST http://localhost:3000/api/alojamientos \
  -H "Content-Type: application/json" \
  -d "{\"titulo\":\"Mi Casa\",\"descripcion\":\"Casa bonita\",\"precio_noche\":100000,\"ubicacion\":\"Cali\",\"capacidad\":4,\"user_id\":\"00000000-0000-0000-0000-000000000001\"}"
```

#### RESERVAS

**Obtener reservas de un usuario:**
```bash
curl "http://localhost:3000/api/reservas?userId=00000000-0000-0000-0000-000000000001"
```

**Solo reservas activas:**
```bash
curl "http://localhost:3000/api/reservas?userId=00000000-0000-0000-0000-000000000001&activas=true"
```

**Crear una reserva:**
```bash
curl -X POST http://localhost:3000/api/reservas \
  -H "Content-Type: application/json" \
  -d "{\"tipo_servicio\":\"alojamiento\",\"servicio_id\":\"[ID-ALOJAMIENTO]\",\"user_id\":\"00000000-0000-0000-0000-000000000001\",\"fecha_inicio\":\"2025-11-20\",\"fecha_fin\":\"2025-11-23\",\"cantidad_personas\":2,\"precio_total\":600000}"
```

**Actualizar estado de reserva:**
```bash
curl -X PATCH http://localhost:3000/api/reservas/[ID-RESERVA] \
  -H "Content-Type: application/json" \
  -d "{\"estado\":\"confirmada\"}"
```

#### RESEÑAS

**Obtener reseñas de un servicio:**
```bash
curl "http://localhost:3000/api/resenas?servicioId=[ID-ALOJAMIENTO]"
```

**Obtener estadísticas de reseñas:**
```bash
curl "http://localhost:3000/api/resenas?servicioId=[ID-ALOJAMIENTO]&estadisticas=true"
```

**Crear una reseña:**
```bash
curl -X POST http://localhost:3000/api/resenas \
  -H "Content-Type: application/json" \
  -d "{\"servicio_id\":\"[ID-ALOJAMIENTO]\",\"tipo_servicio\":\"alojamiento\",\"user_id\":\"00000000-0000-0000-0000-000000000001\",\"calificacion\":5,\"comentario\":\"Excelente!\"}"
```

### Opción 3: Con Postman o Thunder Client (VS Code)

1. Instala Postman (https://www.postman.com/) o Thunder Client en VS Code
2. Crea una nueva request
3. Elige el método (GET, POST, PATCH, DELETE)
4. Pon la URL: `http://localhost:3000/api/alojamientos`
5. Para POST/PATCH, ve a "Body" > "raw" > "JSON" y pega el JSON

---

## Respuestas esperadas

### Éxito
```json
{
  "success": true,
  "data": [...],
  "message": "Mensaje opcional"
}
```

### Error
```json
{
  "success": false,
  "error": "Descripción del error"
}
```

---

## Pruebas paso a paso para principiantes

### 1. Probar GET básico

```bash
# En la terminal:
npm run dev

# En otra terminal o navegador:
curl http://localhost:3000/api/alojamientos
```

**✅ Deberías ver:** JSON con los 4 alojamientos de prueba

### 2. Probar filtros

```bash
curl http://localhost:3000/api/alojamientos?ubicacion=Cali
```

**✅ Deberías ver:** Solo los alojamientos de Cali

### 3. Probar creación (POST)

```bash
curl -X POST http://localhost:3000/api/alojamientos \
  -H "Content-Type: application/json" \
  -d "{\"titulo\":\"Test Casa\",\"descripcion\":\"Casa de prueba\",\"precio_noche\":150000,\"ubicacion\":\"Cali\",\"capacidad\":4,\"user_id\":\"00000000-0000-0000-0000-000000000001\"}"
```

**✅ Deberías ver:** 
```json
{
  "success": true,
  "data": { ... nuevo alojamiento ... },
  "message": "Alojamiento creado exitosamente"
}
```

### 4. Verificar en Supabase

1. Ve a tu proyecto en Supabase
2. Click en "Table Editor"
3. Selecciona "alojamientos"
4. Deberías ver 5 alojamientos ahora (4 de prueba + 1 que creaste)

---

## Errores comunes

### "Failed to fetch" o "Network error"
- ✅ Verifica que `npm run dev` esté corriendo
- ✅ Verifica que uses `http://localhost:3000` (no https)

### "Faltan las variables de entorno de Supabase"
- ✅ Verifica que `.env.local` exista
- ✅ Verifica que tenga las credenciales correctas
- ✅ Reinicia el servidor después de crear `.env.local`

### "Error al obtener alojamientos"
- ✅ Verifica que ejecutaste el script SQL en Supabase
- ✅ Verifica que las credenciales en `.env.local` sean correctas

### Estados HTTP

- **200**: Éxito
- **201**: Creado exitosamente
- **400**: Error en los datos enviados
- **404**: No encontrado
- **500**: Error del servidor

---

## Herramientas recomendadas

1. **Navegador** - Para requests GET simples
2. **cURL** - Ya viene instalado en tu terminal
3. **Thunder Client** - Extensión de VS Code (más fácil que Postman)
4. **Postman** - Herramienta completa para APIs

---

## Próximos pasos

Una vez que todos los endpoints funcionen:

1. Crear componentes React para mostrar los datos
2. Crear formularios para crear alojamientos
3. Implementar autenticación real con Supabase Auth
4. Agregar imágenes reales
5. Crear la interfaz de usuario completa
