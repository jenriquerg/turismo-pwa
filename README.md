# 🏝️ La Perversoapp

Plataforma web progresiva para la gestión de servicios turísticos en Colombia - La Perversoapp.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir en el navegador
http://localhost:3000
```

## 📋 Configuración

1. Crear archivo `.env.local` con tus credenciales de Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_aqui
```

2. Ejecutar el schema SQL en Supabase:
```bash
# Copiar contenido de supabase-schema.sql
# Ejecutar en Supabase SQL Editor
```

## 🎯 Características

### Para Turistas
- 🏠 Explorar alojamientos, alimentos y experiencias
- 📅 Hacer reservas con cálculo automático de precios
- ⭐ Dejar reseñas y calificaciones
- 📋 Gestionar reservas (activas, pasadas, canceladas)

### Para Proveedores
- ➕ Crear y gestionar servicios turísticos
- 📊 Panel de control con estadísticas
- 🔄 Toggle disponibilidad en tiempo real
- ✏️ Editar y eliminar servicios

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15.5.5 (App Router)
- **UI**: React 19 + Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL + Auth)
- **Lenguaje**: TypeScript
- **Build**: Turbopack

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Páginas y rutas
│   ├── api/               # API endpoints
│   ├── alojamientos/      # Vistas de alojamientos
│   ├── alimentos/         # Vistas de alimentos
│   ├── experiencias/      # Vistas de experiencias
│   ├── mis-servicios/     # Panel de proveedor
│   ├── mis-reservas/      # Gestión de reservas
│   └── ...
├── components/            # Componentes reutilizables
│   ├── common/           # Header, Footer, Loading
│   ├── cards/            # Cards de servicios
│   └── forms/            # Formularios
├── controllers/          # Lógica de negocio
├── repositories/         # Acceso a datos
├── lib/                  # Utilidades
└── types/                # Tipos TypeScript
```

## 🔐 Seguridad

- Row Level Security (RLS) en Supabase
- Autenticación con JWT
- Validaciones en cliente y servidor
- Protección de rutas

## 📱 PWA

- ✅ Manifest configurado
- ✅ Responsive design
- ✅ Instalable como app

## 🧪 Testing

```bash
# Construir para producción
npm run build

# Ejecutar producción
npm start
```

## 🎨 Paleta de Colores

- 🏠 Alojamientos: Verde (emerald-600)
- 🍽️ Alimentos: Naranja (orange-600)
- 🎨 Experiencias: Azul (blue-600)

## 📝 Licencia

Proyecto educativo - PWAS

---

**Versión**: 2.0.0
**Estado**: ✅ Funcional
