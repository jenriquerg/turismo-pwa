CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Usuario de prueba (solo si no existe)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000001'
  ) THEN
    INSERT INTO auth.users (id, email)
    VALUES ('00000000-0000-0000-0000-000000000001', 'test@example.com');
  END IF;
END $$;

-- =============================================
-- 🏗️ ESQUEMA DE TABLAS
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

-- =============================================
-- ⚡ FUNCIONES Y TRIGGERS UPDATED_AT
-- =============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_alojamientos_updated_at') THEN
    CREATE TRIGGER update_alojamientos_updated_at
      BEFORE UPDATE ON public.alojamientos
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_alimentos_updated_at') THEN
    CREATE TRIGGER update_alimentos_updated_at
      BEFORE UPDATE ON public.alimentos
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_experiencias_updated_at') THEN
    CREATE TRIGGER update_experiencias_updated_at
      BEFORE UPDATE ON public.experiencias
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_reservas_updated_at') THEN
    CREATE TRIGGER update_reservas_updated_at
      BEFORE UPDATE ON public.reservas
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_resenas_updated_at') THEN
    CREATE TRIGGER update_resenas_updated_at
      BEFORE UPDATE ON public.resenas
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- =============================================
-- 🔒 SEGURIDAD (RLS + POLÍTICAS)
-- =============================================

ALTER TABLE public.alojamientos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resenas ENABLE ROW LEVEL SECURITY;

-- Políticas generales
CREATE POLICY "Lectura pública" ON public.alojamientos FOR SELECT USING (true);
CREATE POLICY "Lectura pública alimentos" ON public.alimentos FOR SELECT USING (true);
CREATE POLICY "Lectura pública experiencias" ON public.experiencias FOR SELECT USING (true);
CREATE POLICY "Lectura pública resenas" ON public.resenas FOR SELECT USING (true);

-- Políticas por usuario
DO $$
DECLARE t TEXT;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('alojamientos','alimentos','experiencias','reservas','resenas')
  LOOP
    -- Eliminar políticas previas si existen
    EXECUTE format('DROP POLICY IF EXISTS "%I_insert_own" ON public.%I;', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "%I_update_own" ON public.%I;', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "%I_delete_own" ON public.%I;', t, t);

    -- Crear nuevamente
    EXECUTE format('CREATE POLICY "%I_insert_own" ON public.%I FOR INSERT WITH CHECK (auth.uid() = user_id);', t, t);
    EXECUTE format('CREATE POLICY "%I_update_own" ON public.%I FOR UPDATE USING (auth.uid() = user_id);', t, t);
    EXECUTE format('CREATE POLICY "%I_delete_own" ON public.%I FOR DELETE USING (auth.uid() = user_id);', t, t);
  END LOOP;
END $$;


-- =============================================
-- 📈 ÍNDICES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_alojamientos_user ON public.alojamientos(user_id);
CREATE INDEX IF NOT EXISTS idx_alojamientos_ubicacion ON public.alojamientos(ubicacion);
CREATE INDEX IF NOT EXISTS idx_alojamientos_disponible ON public.alojamientos(disponible);
CREATE INDEX IF NOT EXISTS idx_alimentos_user ON public.alimentos(user_id);
CREATE INDEX IF NOT EXISTS idx_experiencias_user ON public.experiencias(user_id);
CREATE INDEX IF NOT EXISTS idx_reservas_user ON public.reservas(user_id);
CREATE INDEX IF NOT EXISTS idx_reservas_estado ON public.reservas(estado);
CREATE INDEX IF NOT EXISTS idx_resenas_servicio ON public.resenas(servicio_id);

-- =============================================
-- 🧪 DATOS DE PRUEBA COMPLETOS
-- =============================================

DO $$
DECLARE
  user_prueba UUID := '00000000-0000-0000-0000-000000000001';
  aloj1 UUID; aloj2 UUID; aloj3 UUID; aloj4 UUID; aloj5 UUID;
  alim1 UUID; alim2 UUID; alim3 UUID; alim4 UUID; alim5 UUID;
  exp1 UUID; exp2 UUID; exp3 UUID; exp4 UUID; exp5 UUID;
BEGIN
  IF (SELECT COUNT(*) FROM public.alojamientos) = 0 THEN

    -- ALOJAMIENTOS (8 servicios)
    INSERT INTO public.alojamientos (titulo, descripcion, precio_noche, ubicacion, capacidad, imagenes, user_id, disponible)
    VALUES
      ('Casa Campestre en Cali', 'Hermosa casa con piscina, jardín y zona BBQ. Perfecta para familias.', 250000, 'Cali', 6, ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6'], user_prueba, true),
      ('Cabaña en el Eje Cafetero', 'Cabaña acogedora rodeada de plantaciones de café con vistas espectaculares.', 180000, 'Pereira', 4, ARRAY['https://images.unsplash.com/photo-1542718610-a1d656d1884c'], user_prueba, true),
      ('Apartamento en Cartagena', 'Apartamento moderno en el centro histórico, cerca de la playa y restaurantes.', 300000, 'Cartagena', 4, ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'], user_prueba, true),
      ('Finca en Popayán', 'Finca tradicional con vista a las montañas. Ideal para desconectarse.', 200000, 'Popayán', 8, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64'], user_prueba, false),
      ('Casa de Playa en Santa Marta', 'Casa frente al mar con acceso privado a la playa. Incluye kayaks.', 350000, 'Santa Marta', 8, ARRAY['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2'], user_prueba, true),
      ('Loft Moderno en Medellín', 'Loft en El Poblado con vista panorámica. Totalmente equipado.', 280000, 'Medellín', 2, ARRAY['https://images.unsplash.com/photo-1502672260066-6bc27a0cc829'], user_prueba, true),
      ('Casa Colonial en Villa de Leyva', 'Casa restaurada en el centro histórico. Arquitectura colonial auténtica.', 220000, 'Villa de Leyva', 6, ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750'], user_prueba, true),
      ('Glamping en San Gil', 'Experiencia de glamping con todas las comodidades. Vista al cañón.', 150000, 'San Gil', 2, ARRAY['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4'], user_prueba, true);

    -- ALIMENTOS (8 servicios)
    INSERT INTO public.alimentos (nombre, descripcion, precio, disponibilidad, horario_recogida, user_id)
    VALUES
      ('Sancocho Valluno', 'Tradicional sancocho del Valle del Cauca con pollo, yuca, plátano y mazorca.', 25000, true, '11:00 - 14:00', user_prueba),
      ('Bandeja Paisa', 'Plato típico antioqueño completo: frijoles, chicharrón, arroz, huevo, aguacate.', 30000, true, '12:00 - 15:00', user_prueba),
      ('Empanadas Vallecaucanas', 'Paquete de 6 empanadas recién hechas con ají de la casa.', 15000, true, '08:00 - 20:00', user_prueba),
      ('Ajiaco Santafereño', 'Sopa tradicional de Bogotá con tres tipos de papa, pollo y mazorca.', 28000, true, '12:00 - 15:00', user_prueba),
      ('Arroz con Coco y Pescado Frito', 'Plato típico de la costa Caribe. Incluye patacones y ensalada.', 32000, true, '12:00 - 16:00', user_prueba),
      ('Lechona Tolimense', 'Porción generosa de lechona con insulso y arepa. Especialidad del Tolima.', 35000, true, '10:00 - 15:00', user_prueba),
      ('Tamales Tolimenses', 'Paquete de 2 tamales tradicionales envueltos en hoja de plátano.', 20000, true, '06:00 - 11:00', user_prueba),
      ('Fritanga Colombiana', 'Variedad de carnes fritas: chorizo, morcilla, chicharrón. Incluye papa criolla.', 38000, true, '17:00 - 22:00', user_prueba);

    -- EXPERIENCIAS (10 servicios)
    INSERT INTO public.experiencias (titulo, descripcion, precio, tipo, duracion_horas, capacidad_maxima, ubicacion, user_id)
    VALUES
      ('Tour del Café', 'Recorrido por fincas cafeteras tradicionales. Aprende el proceso del café de Colombia.', 80000, 'cultural', 4, 15, 'Pereira', user_prueba),
      ('Senderismo al PNN Farallones', 'Caminata guiada por senderos ecológicos. Incluye refrigerio y guía experto.', 60000, 'senderismo', 6, 10, 'Cali', user_prueba),
      ('City Tour Cartagena Histórica', 'Recorrido por el centro histórico de Cartagena con guía profesional.', 50000, 'cultural', 3, 20, 'Cartagena', user_prueba),
      ('Rafting en San Gil', 'Descenso de rafting nivel 3-4 en el río Suárez. Incluye equipo y guía.', 95000, 'aventura', 4, 8, 'San Gil', user_prueba),
      ('Tour Gastronómico en Bogotá', 'Recorrido culinario por La Candelaria. Prueba 8 platos típicos.', 85000, 'gastronomica', 4, 12, 'Bogotá', user_prueba),
      ('Parapente en Chicamocha', 'Vuelo en parapente con instructor certificado. Incluye video y fotos.', 120000, 'aventura', 2, 4, 'San Gil', user_prueba),
      ('Ciclomontañismo Valle de Cocora', 'Ruta de ciclomontañismo por el Valle de Cocora. Incluye bicicleta y casco.', 70000, 'ciclismo', 5, 8, 'Salento', user_prueba),
      ('Tour de Avistamiento de Ballenas', 'Experiencia única de avistamiento de ballenas jorobadas. Temporada julio-octubre.', 110000, 'aventura', 4, 15, 'Nuquí', user_prueba),
      ('Clase de Salsa en Cali', 'Clase de salsa con bailarines profesionales. Incluye presentación en vivo.', 40000, 'cultural', 2, 20, 'Cali', user_prueba),
      ('Caminata Nocturna por La Candelaria', 'Tour nocturno por el barrio histórico. Incluye leyendas y mitos de Bogotá.', 45000, 'cultural', 3, 15, 'Bogotá', user_prueba);

    -- Obtener IDs de servicios para reservas y reseñas
    SELECT id INTO aloj1 FROM public.alojamientos WHERE titulo = 'Casa Campestre en Cali' LIMIT 1;
    SELECT id INTO aloj2 FROM public.alojamientos WHERE titulo = 'Cabaña en el Eje Cafetero' LIMIT 1;
    SELECT id INTO aloj3 FROM public.alojamientos WHERE titulo = 'Apartamento en Cartagena' LIMIT 1;
    SELECT id INTO aloj4 FROM public.alojamientos WHERE titulo = 'Casa de Playa en Santa Marta' LIMIT 1;
    SELECT id INTO aloj5 FROM public.alojamientos WHERE titulo = 'Loft Moderno en Medellín' LIMIT 1;

    SELECT id INTO alim1 FROM public.alimentos WHERE nombre = 'Sancocho Valluno' LIMIT 1;
    SELECT id INTO alim2 FROM public.alimentos WHERE nombre = 'Bandeja Paisa' LIMIT 1;
    SELECT id INTO alim3 FROM public.alimentos WHERE nombre = 'Ajiaco Santafereño' LIMIT 1;

    SELECT id INTO exp1 FROM public.experiencias WHERE titulo = 'Tour del Café' LIMIT 1;
    SELECT id INTO exp2 FROM public.experiencias WHERE titulo = 'Senderismo al PNN Farallones' LIMIT 1;
    SELECT id INTO exp3 FROM public.experiencias WHERE titulo = 'Rafting en San Gil' LIMIT 1;

    -- RESERVAS (mix de estados y tipos)
    INSERT INTO public.reservas (tipo_servicio, servicio_id, user_id, fecha_inicio, fecha_fin, cantidad_personas, precio_total, estado)
    VALUES
      -- Alojamientos
      ('alojamiento', aloj1, user_prueba, '2025-11-01', '2025-11-04', 4, 750000, 'confirmada'),
      ('alojamiento', aloj2, user_prueba, '2025-11-10', '2025-11-12', 2, 360000, 'pendiente'),
      ('alojamiento', aloj3, user_prueba, '2025-12-20', '2025-12-25', 4, 1500000, 'pendiente'),
      ('alojamiento', aloj4, user_prueba, '2025-10-15', '2025-10-20', 6, 1750000, 'completada'),
      ('alojamiento', aloj5, user_prueba, '2025-09-05', '2025-09-07', 2, 560000, 'completada'),
      -- Alimentos
      ('alimento', alim1, user_prueba, '2025-11-05', NULL, 4, 100000, 'pendiente'),
      ('alimento', alim2, user_prueba, '2025-11-06', NULL, 2, 60000, 'confirmada'),
      ('alimento', alim3, user_prueba, '2025-10-20', NULL, 3, 84000, 'completada'),
      -- Experiencias
      ('experiencia', exp1, user_prueba, '2025-11-08', NULL, 2, 160000, 'pendiente'),
      ('experiencia', exp2, user_prueba, '2025-11-15', NULL, 4, 240000, 'confirmada'),
      ('experiencia', exp3, user_prueba, '2025-10-10', NULL, 2, 190000, 'completada');

    -- RESEÑAS (variedad de calificaciones)
    INSERT INTO public.resenas (servicio_id, tipo_servicio, user_id, calificacion, comentario)
    VALUES
      -- Alojamientos
      (aloj1, 'alojamiento', user_prueba, 5, 'Excelente lugar, la casa es hermosa y muy cómoda. La piscina es perfecta.'),
      (aloj1, 'alojamiento', user_prueba, 4, 'Muy buena ubicación y atención del anfitrión.'),
      (aloj2, 'alojamiento', user_prueba, 5, 'Hermosa cabaña con vista increíble al paisaje cafetero.'),
      (aloj3, 'alojamiento', user_prueba, 4, 'Cómodo y bien ubicado. Cerca de todo en el centro histórico.'),
      (aloj4, 'alojamiento', user_prueba, 5, 'La mejor experiencia de playa! Casa impecable y vista espectacular.'),
      (aloj5, 'alojamiento', user_prueba, 5, 'Loft moderno con todas las comodidades. Vista increíble de Medellín.'),
      -- Alimentos
      (alim1, 'alimento', user_prueba, 5, 'El mejor sancocho que he probado! Muy auténtico.'),
      (alim2, 'alimento', user_prueba, 5, 'Bandeja paisa deliciosa y abundante. Totalmente recomendado.'),
      (alim3, 'alimento', user_prueba, 4, 'Ajiaco muy rico, porción generosa.'),
      -- Experiencias
      (exp1, 'experiencia', user_prueba, 5, 'Tour del café increíble! Aprendí mucho sobre el proceso del café colombiano.'),
      (exp2, 'experiencia', user_prueba, 4, 'Senderismo muy bien organizado. Guía conocedor y paisajes hermosos.'),
      (exp3, 'experiencia', user_prueba, 5, 'Rafting emocionante! La mejor aventura. Guías muy profesionales.');
  END IF;
END $$;