-- ============================================
-- SCRIPT DE CONFIGURACIÓN DE SUPABASE
-- ============================================
-- Ejecuta este script en el SQL Editor de Supabase

-- 1. HABILITAR EXTENSIONES NECESARIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREAR TABLAS

-- Tabla de alojamientos
CREATE TABLE IF NOT EXISTS alojamientos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  precio_noche DECIMAL NOT NULL,
  ubicacion TEXT NOT NULL,
  capacidad INT NOT NULL,
  imagenes TEXT[] DEFAULT '{}',
  user_id UUID NOT NULL,
  disponible BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de alimentos
CREATE TABLE IF NOT EXISTS alimentos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL NOT NULL,
  disponibilidad BOOLEAN DEFAULT true,
  horario_recogida TEXT,
  imagenes TEXT[] DEFAULT '{}',
  user_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de experiencias
CREATE TABLE IF NOT EXISTS experiencias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL NOT NULL,
  tipo TEXT NOT NULL,
  duracion_horas DECIMAL NOT NULL,
  capacidad_maxima INT NOT NULL,
  ubicacion TEXT NOT NULL,
  imagenes TEXT[] DEFAULT '{}',
  user_id UUID NOT NULL,
  disponible BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de reservas
CREATE TABLE IF NOT EXISTS reservas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tipo_servicio TEXT NOT NULL,
  servicio_id UUID NOT NULL,
  user_id UUID NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE,
  cantidad_personas INT NOT NULL,
  precio_total DECIMAL NOT NULL,
  estado TEXT DEFAULT 'pendiente',
  notas TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de reseñas
CREATE TABLE IF NOT EXISTS resenas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  servicio_id UUID NOT NULL,
  tipo_servicio TEXT NOT NULL,
  user_id UUID NOT NULL,
  calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
  comentario TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. INSERTAR DATOS DE PRUEBA

-- Usuario de prueba (ID fijo)
DO $$
DECLARE
  user_prueba UUID := '00000000-0000-0000-0000-000000000001';
  aloj1 UUID;
  aloj2 UUID;
  aloj3 UUID;
BEGIN

-- Alojamientos
INSERT INTO alojamientos (id, titulo, descripcion, precio_noche, ubicacion, capacidad, imagenes, user_id, disponible)
VALUES 
  (uuid_generate_v4(), 'Casa Campestre en Cali', 'Hermosa casa con piscina y jardín', 250000, 'Cali', 6, ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6'], user_prueba, true),
  (uuid_generate_v4(), 'Cabaña en el Eje Cafetero', 'Cabaña acogedora rodeada de café', 180000, 'Pereira', 4, ARRAY['https://images.unsplash.com/photo-1542718610-a1d656d1884c'], user_prueba, true),
  (uuid_generate_v4(), 'Apartamento en Cartagena', 'Apartamento moderno cerca de la playa', 300000, 'Cartagena', 4, ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'], user_prueba, true),
  (uuid_generate_v4(), 'Finca en Popayán', 'Finca tradicional con vista a las montañas', 200000, 'Popayán', 8, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64'], user_prueba, false)
RETURNING id INTO aloj1;

-- Alimentos
INSERT INTO alimentos (nombre, descripcion, precio, disponibilidad, horario_recogida, user_id)
VALUES 
  ('Sancocho Valluno', 'Tradicional sancocho del Valle del Cauca', 25000, true, '11:00 - 14:00', user_prueba),
  ('Bandeja Paisa', 'Plato típico antioqueño completo', 30000, true, '12:00 - 15:00', user_prueba),
  ('Empanadas Vallecaucanas', 'Paquete de 6 empanadas', 15000, true, '08:00 - 20:00', user_prueba);

-- Experiencias
INSERT INTO experiencias (titulo, descripcion, precio, tipo, duracion_horas, capacidad_maxima, ubicacion, user_id)
VALUES 
  ('Tour del Café', 'Recorrido por fincas cafeteras', 80000, 'cultural', 4, 15, 'Pereira', user_prueba),
  ('Senderismo al PNN', 'Caminata guiada por senderos', 60000, 'senderismo', 6, 10, 'Cali', user_prueba),
  ('City Tour Cartagena', 'Recorrido histórico', 50000, 'cultural', 3, 20, 'Cartagena', user_prueba);

-- Guardar IDs para reservas
SELECT id INTO aloj1 FROM alojamientos WHERE titulo = 'Casa Campestre en Cali' LIMIT 1;
SELECT id INTO aloj2 FROM alojamientos WHERE titulo = 'Cabaña en el Eje Cafetero' LIMIT 1;
SELECT id INTO aloj3 FROM alojamientos WHERE titulo = 'Apartamento en Cartagena' LIMIT 1;

-- Reservas
INSERT INTO reservas (tipo_servicio, servicio_id, user_id, fecha_inicio, fecha_fin, cantidad_personas, precio_total, estado)
VALUES 
  ('alojamiento', aloj1, user_prueba, '2025-11-01', '2025-11-04', 4, 750000, 'confirmada'),
  ('alojamiento', aloj2, user_prueba, '2025-11-10', '2025-11-12', 2, 360000, 'pendiente'),
  ('alojamiento', aloj3, user_prueba, '2025-12-20', '2025-12-25', 4, 1500000, 'pendiente');

-- Reseñas
INSERT INTO resenas (servicio_id, tipo_servicio, user_id, calificacion, comentario)
VALUES 
  (aloj1, 'alojamiento', user_prueba, 5, 'Excelente lugar! La casa es hermosa.'),
  (aloj1, 'alojamiento', user_prueba, 4, 'Muy buena ubicación.'),
  (aloj2, 'alojamiento', user_prueba, 5, 'Hermosa cabaña, el paisaje es increíble.'),
  (aloj3, 'alojamiento', user_prueba, 3, 'La ubicación es buena.');

END $$;

-- 4. ROW LEVEL SECURITY
ALTER TABLE alojamientos ENABLE ROW LEVEL SECURITY;
ALTER TABLE alimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE resenas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir todo en alojamientos" ON alojamientos FOR ALL USING (true);
CREATE POLICY "Permitir todo en alimentos" ON alimentos FOR ALL USING (true);
CREATE POLICY "Permitir todo en experiencias" ON experiencias FOR ALL USING (true);
CREATE POLICY "Permitir todo en reservas" ON reservas FOR ALL USING (true);
CREATE POLICY "Permitir todo en resenas" ON resenas FOR ALL USING (true);

-- 5. ÍNDICES
CREATE INDEX IF NOT EXISTS idx_alojamientos_ubicacion ON alojamientos(ubicacion);
CREATE INDEX IF NOT EXISTS idx_alojamientos_disponible ON alojamientos(disponible);
CREATE INDEX IF NOT EXISTS idx_reservas_user_id ON reservas(user_id);
CREATE INDEX IF NOT EXISTS idx_reservas_estado ON reservas(estado);
CREATE INDEX IF NOT EXISTS idx_resenas_servicio_id ON resenas(servicio_id);
