-- =============================================
-- ESQUEMA DE BASE DE DATOS - PLATAFORMA TURISMO
-- =============================================
-- Ejecuta este script en tu proyecto de Supabase
-- Dashboard > SQL Editor > New Query > Pega y ejecuta

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLA: alojamientos
-- =============================================
CREATE TABLE IF NOT EXISTS public.alojamientos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  precio_noche DECIMAL(10,2) NOT NULL CHECK (precio_noche > 0),
  ubicacion TEXT NOT NULL,
  capacidad INTEGER NOT NULL CHECK (capacidad > 0),
  imagenes TEXT[] DEFAULT '{}',
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  disponible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLA: alimentos
-- =============================================
CREATE TABLE IF NOT EXISTS public.alimentos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
  disponibilidad BOOLEAN DEFAULT true,
  horario_recogida TEXT,
  imagenes TEXT[] DEFAULT '{}',
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLA: experiencias
-- =============================================
CREATE TABLE IF NOT EXISTS public.experiencias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
  tipo TEXT NOT NULL CHECK (tipo IN ('senderismo', 'ciclismo', 'cultural', 'gastronomica', 'aventura')),
  duracion_horas DECIMAL(5,2) NOT NULL CHECK (duracion_horas > 0),
  capacidad_maxima INTEGER NOT NULL CHECK (capacidad_maxima > 0),
  ubicacion TEXT NOT NULL,
  imagenes TEXT[] DEFAULT '{}',
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  disponible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLA: reservas
-- =============================================
CREATE TABLE IF NOT EXISTS public.reservas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tipo_servicio TEXT NOT NULL CHECK (tipo_servicio IN ('alojamiento', 'alimento', 'experiencia')),
  servicio_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fecha_inicio TIMESTAMPTZ NOT NULL,
  fecha_fin TIMESTAMPTZ,
  cantidad_personas INTEGER NOT NULL CHECK (cantidad_personas > 0),
  precio_total DECIMAL(10,2) NOT NULL CHECK (precio_total > 0),
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmada', 'pagada', 'completada', 'cancelada')),
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLA: resenas
-- =============================================
CREATE TABLE IF NOT EXISTS public.resenas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  servicio_id UUID NOT NULL,
  tipo_servicio TEXT NOT NULL CHECK (tipo_servicio IN ('alojamiento', 'alimento', 'experiencia')),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  calificacion INTEGER NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
  comentario TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ÍNDICES PARA MEJOR RENDIMIENTO
-- =============================================

-- Alojamientos
CREATE INDEX IF NOT EXISTS idx_alojamientos_user ON alojamientos(user_id);
CREATE INDEX IF NOT EXISTS idx_alojamientos_disponible ON alojamientos(disponible);
CREATE INDEX IF NOT EXISTS idx_alojamientos_ubicacion ON alojamientos(ubicacion);

-- Alimentos
CREATE INDEX IF NOT EXISTS idx_alimentos_user ON alimentos(user_id);
CREATE INDEX IF NOT EXISTS idx_alimentos_disponible ON alimentos(disponibilidad);

-- Experiencias
CREATE INDEX IF NOT EXISTS idx_experiencias_user ON experiencias(user_id);
CREATE INDEX IF NOT EXISTS idx_experiencias_tipo ON experiencias(tipo);
CREATE INDEX IF NOT EXISTS idx_experiencias_disponible ON experiencias(disponible);

-- Reservas
CREATE INDEX IF NOT EXISTS idx_reservas_user ON reservas(user_id);
CREATE INDEX IF NOT EXISTS idx_reservas_servicio ON reservas(servicio_id);
CREATE INDEX IF NOT EXISTS idx_reservas_estado ON reservas(estado);
CREATE INDEX IF NOT EXISTS idx_reservas_tipo ON reservas(tipo_servicio);

-- Reseñas
CREATE INDEX IF NOT EXISTS idx_resenas_servicio ON resenas(servicio_id);
CREATE INDEX IF NOT EXISTS idx_resenas_user ON resenas(user_id);

-- =============================================
-- FUNCIONES PARA UPDATED_AT AUTOMÁTICO
-- =============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- TRIGGERS PARA UPDATED_AT
-- =============================================

CREATE TRIGGER update_alojamientos_updated_at
  BEFORE UPDATE ON public.alojamientos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_alimentos_updated_at
  BEFORE UPDATE ON public.alimentos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experiencias_updated_at
  BEFORE UPDATE ON public.experiencias
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reservas_updated_at
  BEFORE UPDATE ON public.reservas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resenas_updated_at
  BEFORE UPDATE ON public.resenas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.alojamientos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resenas ENABLE ROW LEVEL SECURITY;

-- =============================================
-- POLÍTICAS DE SEGURIDAD
-- =============================================

-- ALOJAMIENTOS: Todos pueden leer, solo dueño puede modificar
CREATE POLICY "Alojamientos: Lectura pública"
  ON public.alojamientos FOR SELECT
  USING (true);

CREATE POLICY "Alojamientos: Crear propio"
  ON public.alojamientos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Alojamientos: Actualizar propio"
  ON public.alojamientos FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Alojamientos: Eliminar propio"
  ON public.alojamientos FOR DELETE
  USING (auth.uid() = user_id);

-- ALIMENTOS: Todos pueden leer, solo dueño puede modificar
CREATE POLICY "Alimentos: Lectura pública"
  ON public.alimentos FOR SELECT
  USING (true);

CREATE POLICY "Alimentos: Crear propio"
  ON public.alimentos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Alimentos: Actualizar propio"
  ON public.alimentos FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Alimentos: Eliminar propio"
  ON public.alimentos FOR DELETE
  USING (auth.uid() = user_id);

-- EXPERIENCIAS: Todos pueden leer, solo dueño puede modificar
CREATE POLICY "Experiencias: Lectura pública"
  ON public.experiencias FOR SELECT
  USING (true);

CREATE POLICY "Experiencias: Crear propia"
  ON public.experiencias FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Experiencias: Actualizar propia"
  ON public.experiencias FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Experiencias: Eliminar propia"
  ON public.experiencias FOR DELETE
  USING (auth.uid() = user_id);

-- RESERVAS: Solo el usuario puede ver y gestionar sus reservas
CREATE POLICY "Reservas: Ver propias"
  ON public.reservas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Reservas: Crear propias"
  ON public.reservas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Reservas: Actualizar propias"
  ON public.reservas FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Reservas: Eliminar propias"
  ON public.reservas FOR DELETE
  USING (auth.uid() = user_id);

-- RESEÑAS: Todos pueden leer, solo dueño puede modificar
CREATE POLICY "Reseñas: Lectura pública"
  ON public.resenas FOR SELECT
  USING (true);

CREATE POLICY "Reseñas: Crear propia"
  ON public.resenas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Reseñas: Actualizar propia"
  ON public.resenas FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Reseñas: Eliminar propia"
  ON public.resenas FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- HABILITAR REALTIME (Opcional)
-- =============================================
-- Si quieres actualizaciones en tiempo real, ejecuta también:

-- ALTER PUBLICATION supabase_realtime ADD TABLE public.reservas;
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.resenas;

-- =============================================
-- ¡LISTO!
-- =============================================
-- Tu base de datos está configurada y lista para usar
