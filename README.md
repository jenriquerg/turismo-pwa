# 🏝️ Turismo PWA

**Una plataforma web progresiva para conectar viajeros con servicios turísticos locales**

Equipo: José Ángel González Santafé, Lizet Jazmín Olvera González, Jesús Enrique Rojas Guerrero
Fecha: Octubre 2025

---

## ¿Qué es esto?

Esta es una aplicación web que ayuda a conectar turistas con servicios locales como hospedaje, comida y actividades. Funciona como una app nativa pero sin necesidad de instalarla desde ninguna tienda: simplemente la abres en tu navegador.

Lo mejor: funciona incluso con internet limitado, algo super útil en zonas donde la conexión no es tan buena.

---

## ¿Qué puedes hacer aquí?

- 🏠 **Buscar alojamientos** - Encuentra dónde quedarte
- 🍽️ **Pedir comida** - Ordena platillos locales
- 🚵 **Reservar experiencias** - Actividades como senderismo, tours culturales, etc.
- ⭐ **Dejar reseñas** - Comparte tu experiencia con otros viajeros
- 📱 **Funciona offline** - La app guarda información para que puedas verla sin internet

---

## Estado actual del proyecto

### ✅ Fase 1 - Los cimientos (COMPLETADA)

Ya tenemos toda la base del proyecto funcionando:

- La estructura está organizada y lista
- TypeScript configurado (para evitar errores tontos)
- Base de datos preparada con Supabase
- Sistema de almacenamiento de datos (Repositories)
- Sistema de creación de objetos (Factories)
- Configuración PWA para que funcione como app

📖 Todos los detalles técnicos están en: [FASE1-COMPLETADA.md](./FASE1-COMPLETADA.md)

### ⏳ Lo que viene después
- **Fase 2**: Lógica de negocio y estados
- **Fase 3**: Rutas de API y validaciones
- **Fase 4**: Interfaz de usuario completa

---

## ¿Cómo está organizado el código?

Usamos una arquitectura por capas. Piénsalo como un edificio:

```
┌─────────────────────────────────┐
│  LO QUE VES (Interfaz)         │  ← React + Next.js
├─────────────────────────────────┤
│  RUTAS Y VALIDACIONES          │  ← API que recibe peticiones
├─────────────────────────────────┤
│  LÓGICA DE NEGOCIO             │  ← Reglas y procesos
├─────────────────────────────────┤
│  ACCESO A DATOS                │  ← Habla con la base de datos
├─────────────────────────────────┤
│  BASE DE DATOS                 │  ← Supabase (donde se guarda todo)
└─────────────────────────────────┘
```

### Patrones de diseño que usamos

Son como "recetas" probadas para resolver problemas comunes:

- **MVC**: Separa la interfaz, la lógica y los datos
- **Singleton**: Un solo cliente de base de datos para toda la app
- **Repository**: Facilita cambiar de base de datos si es necesario
- **Factory**: Crea objetos complejos de forma consistente

---

## Tecnologías que usamos

- **Next.js 15** - El framework principal (React con superpoderes)
- **TypeScript** - JavaScript pero más seguro
- **Supabase** - Base de datos en la nube (PostgreSQL)
- **Tailwind CSS** - Estilos rápidos y bonitos
- **next-pwa** - Lo que hace que funcione como app

---

## Cómo empezar

### Paso 1: Descargar el proyecto
```bash
git clone <url-del-repo>
cd proyecto-turismo
```

### Paso 2: Instalar todo lo necesario
```bash
npm install
```

### Paso 3: Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a SQL Editor y pega el contenido de `supabase-schema.sql`
4. Ejecuta el script (crea todas las tablas necesarias)
5. Copia tus credenciales desde Settings > API

### Paso 4: Configurar variables de entorno
```bash
# Copia el archivo de ejemplo
cp .env.example .env.local
```

Luego abre `.env.local` y pega tus credenciales de Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=tu-url-aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key-aqui
```

### Paso 5: Arrancar el proyecto
```bash
npm run dev
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000)

### Otros comandos útiles
```bash
npm run build    # Compilar para producción
npm run start    # Servidor de producción
npm run lint     # Revisar código
```

---

## 📁 Estructura del Proyecto

```
src/
├── types/              # Models (MVC) - Interfaces TypeScript
├── lib/
│   ├── supabase/      # Singleton Pattern - Cliente Supabase
│   └── validations/   # Schemas de validación Zod
├── repositories/       # Repository Pattern - Acceso a datos
├── factories/         # Factory Pattern - Creación de objetos
├── services/          # Lógica de negocio (próxima fase)
├── observers/         # Observer Pattern (próxima fase)
├── hooks/             # Custom React Hooks (próxima fase)
├── components/        # Views (MVC) - Componentes React
└── app/               # Next.js App Router
    ├── api/           # Controllers (MVC) - API Routes
    ├── alojamientos/
    ├── alimentos/
    └── experiencias/
```

---

## 🗃️ Base de Datos (Supabase)

### Tablas principales
- `alojamientos` - Información de hospedaje
- `alimentos` - Menús y platos disponibles
- `experiencias` - Actividades turísticas
- `reservas` - Gestión unificada de reservas
- `resenas` - Calificaciones y comentarios
- `auth.users` - Usuarios (tabla de Supabase Auth)

### Realtime habilitado
- Actualizaciones en tiempo real de reservas y reseñas
- Patrón Observer nativo de Supabase

## Convenciones y flujo Git

- Ramas principales:

  - `main` → producción estable
  - `dev` → desarrollo activo
  - `test` → QA / pruebas
  - `prod` → builds listos para despliegue (opcional)

- Workflow:

  - Crear `feature/x-descripcion` a partir de `dev`.
  - Hacer PR a `dev` con descripción y checklist.
  - Revisiones entre pares obligatorias (mín. 1 revisor).
  - Merge a `test` cuando la feature esté lista para QA.
  - Promocionar a `main`/`prod` tras aprobación.

- Versionado semántico: `major.minor.patch`.
