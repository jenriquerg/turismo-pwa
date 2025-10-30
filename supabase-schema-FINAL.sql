
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- Tabla: alimentos
-- Almacena información de servicios de alimentación
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

-- Tabla: experiencias
-- Almacena información de experiencias turísticas
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

-- Tabla: reservas
-- Almacena las reservas de todos los tipos de servicios
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

-- Tabla: resenas
-- Almacena las reseñas y calificaciones de los servicios
CREATE TABLE IF NOT EXISTS public.resenas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  servicio_id UUID NOT NULL,
  tipo_servicio TEXT NOT NULL CHECK (tipo_servicio IN ('alojamiento', 'alimento', 'experiencia')),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  calificacion INTEGER NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
  comentario TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ⚡ TRIGGERS PARA UPDATED_AT
-- ============================================

-- Función para actualizar automáticamente el campo updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas
DO $$
BEGIN
  -- Alojamientos
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_alojamientos_updated_at') THEN
    CREATE TRIGGER update_alojamientos_updated_at
      BEFORE UPDATE ON public.alojamientos
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  -- Alimentos
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_alimentos_updated_at') THEN
    CREATE TRIGGER update_alimentos_updated_at
      BEFORE UPDATE ON public.alimentos
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  -- Experiencias
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_experiencias_updated_at') THEN
    CREATE TRIGGER update_experiencias_updated_at
      BEFORE UPDATE ON public.experiencias
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  -- Reservas
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_reservas_updated_at') THEN
    CREATE TRIGGER update_reservas_updated_at
      BEFORE UPDATE ON public.reservas
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  -- Reseñas
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_resenas_updated_at') THEN
    CREATE TRIGGER update_resenas_updated_at
      BEFORE UPDATE ON public.resenas
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

ALTER TABLE public.alojamientos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resenas ENABLE ROW LEVEL SECURITY;


DROP POLICY IF EXISTS "alojamientos_select_all" ON public.alojamientos;
DROP POLICY IF EXISTS "alojamientos_insert_auth" ON public.alojamientos;
DROP POLICY IF EXISTS "alojamientos_update_owner" ON public.alojamientos;
DROP POLICY IF EXISTS "alojamientos_delete_owner" ON public.alojamientos;

CREATE POLICY "alojamientos_select_all"
  ON public.alojamientos
  FOR SELECT
  USING (true);

CREATE POLICY "alojamientos_insert_auth"
  ON public.alojamientos
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "alojamientos_update_owner"
  ON public.alojamientos
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "alojamientos_delete_owner"
  ON public.alojamientos
  FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "alimentos_select_all" ON public.alimentos;
DROP POLICY IF EXISTS "alimentos_insert_auth" ON public.alimentos;
DROP POLICY IF EXISTS "alimentos_update_owner" ON public.alimentos;
DROP POLICY IF EXISTS "alimentos_delete_owner" ON public.alimentos;

CREATE POLICY "alimentos_select_all"
  ON public.alimentos
  FOR SELECT
  USING (true);

CREATE POLICY "alimentos_insert_auth"
  ON public.alimentos
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "alimentos_update_owner"
  ON public.alimentos
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "alimentos_delete_owner"
  ON public.alimentos
  FOR DELETE
  USING (auth.uid() = user_id);


DROP POLICY IF EXISTS "experiencias_select_all" ON public.experiencias;
DROP POLICY IF EXISTS "experiencias_insert_auth" ON public.experiencias;
DROP POLICY IF EXISTS "experiencias_update_owner" ON public.experiencias;
DROP POLICY IF EXISTS "experiencias_delete_owner" ON public.experiencias;

CREATE POLICY "experiencias_select_all"
  ON public.experiencias
  FOR SELECT
  USING (true);

CREATE POLICY "experiencias_insert_auth"
  ON public.experiencias
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "experiencias_update_owner"
  ON public.experiencias
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "experiencias_delete_owner"
  ON public.experiencias
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 📋 POLÍTICAS RLS - RESERVAS
-- ============================================
-- Los usuarios solo pueden ver/crear/editar/eliminar sus propias reservas

DROP POLICY IF EXISTS "reservas_select_own" ON public.reservas;
DROP POLICY IF EXISTS "reservas_insert_auth" ON public.reservas;
DROP POLICY IF EXISTS "reservas_update_own" ON public.reservas;
DROP POLICY IF EXISTS "reservas_delete_own" ON public.reservas;

CREATE POLICY "reservas_select_own"
  ON public.reservas
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "reservas_insert_auth"
  ON public.reservas
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reservas_update_own"
  ON public.reservas
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "reservas_delete_own"
  ON public.reservas
  FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "resenas_select_all" ON public.resenas;
DROP POLICY IF EXISTS "resenas_insert_auth" ON public.resenas;
DROP POLICY IF EXISTS "resenas_update_own" ON public.resenas;
DROP POLICY IF EXISTS "resenas_delete_own" ON public.resenas;

CREATE POLICY "resenas_select_all"
  ON public.resenas
  FOR SELECT
  USING (true);

CREATE POLICY "resenas_insert_auth"
  ON public.resenas
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "resenas_update_own"
  ON public.resenas
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "resenas_delete_own"
  ON public.resenas
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 📈 ÍNDICES PARA OPTIMIZACIÓN DE QUERIES
-- ============================================

-- Índices para alojamientos
CREATE INDEX IF NOT EXISTS idx_alojamientos_user
  ON public.alojamientos(user_id);

CREATE INDEX IF NOT EXISTS idx_alojamientos_ubicacion
  ON public.alojamientos(ubicacion);

CREATE INDEX IF NOT EXISTS idx_alojamientos_disponible
  ON public.alojamientos(disponible);

CREATE INDEX IF NOT EXISTS idx_alojamientos_precio
  ON public.alojamientos(precio_noche);

CREATE INDEX IF NOT EXISTS idx_alojamientos_capacidad
  ON public.alojamientos(capacidad);

-- Índices para alimentos
CREATE INDEX IF NOT EXISTS idx_alimentos_user
  ON public.alimentos(user_id);

CREATE INDEX IF NOT EXISTS idx_alimentos_disponibilidad
  ON public.alimentos(disponibilidad);

-- Índices para experiencias
CREATE INDEX IF NOT EXISTS idx_experiencias_user
  ON public.experiencias(user_id);

CREATE INDEX IF NOT EXISTS idx_experiencias_tipo
  ON public.experiencias(tipo);

CREATE INDEX IF NOT EXISTS idx_experiencias_ubicacion
  ON public.experiencias(ubicacion);

CREATE INDEX IF NOT EXISTS idx_experiencias_disponible
  ON public.experiencias(disponible);

-- Índices para reservas
CREATE INDEX IF NOT EXISTS idx_reservas_user
  ON public.reservas(user_id);

CREATE INDEX IF NOT EXISTS idx_reservas_estado
  ON public.reservas(estado);

CREATE INDEX IF NOT EXISTS idx_reservas_servicio
  ON public.reservas(servicio_id, tipo_servicio);

CREATE INDEX IF NOT EXISTS idx_reservas_fecha_inicio
  ON public.reservas(fecha_inicio);

-- Índices para reseñas
CREATE INDEX IF NOT EXISTS idx_resenas_servicio
  ON public.resenas(servicio_id, tipo_servicio);

CREATE INDEX IF NOT EXISTS idx_resenas_user
  ON public.resenas(user_id);

CREATE INDEX IF NOT EXISTS idx_resenas_calificacion
  ON public.resenas(calificacion);

SELECT
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = 'public' AND table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN ('alojamientos', 'alimentos', 'experiencias', 'reservas', 'resenas')
ORDER BY table_name;

-- 2. Verificar que RLS está habilitado
SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('alojamientos', 'alimentos', 'experiencias', 'reservas', 'resenas')
ORDER BY tablename;

-- 3. Contar políticas RLS por tabla (deben ser 4 por tabla = 20 total)
SELECT
  schemaname,
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY schemaname, tablename
ORDER BY tablename;

-- 4. Verificar índices creados
SELECT
  tablename,
  indexname
FROM pg_indexes
WHERE schemaname = 'public'
  AND indexname LIKE 'idx_%'
ORDER BY tablename, indexname;