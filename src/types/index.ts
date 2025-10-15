// Tipos base del sistema (Models del MVC)
export enum ReservaEstado {
  PENDIENTE = 'pendiente',
  CONFIRMADA = 'confirmada',
  PAGADA = 'pagada',
  COMPLETADA = 'completada',
  CANCELADA = 'cancelada',
}

export enum TipoServicio {
  ALOJAMIENTO = 'alojamiento',
  ALIMENTO = 'alimento',
  EXPERIENCIA = 'experiencia',
}

export enum TipoExperiencia {
  SENDERISMO = 'senderismo',
  CICLISMO = 'ciclismo',
  CULTURAL = 'cultural',
  GASTRONOMICA = 'gastronomica',
  AVENTURA = 'aventura',
}

// Entidades principales

// Usuario
export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  telefono?: string;
  created_at: string;
  updated_at: string;
}

// Alojamiento
export interface Alojamiento {
  id: string;
  titulo: string;
  descripcion: string;
  precio_noche: number;
  ubicacion: string;
  capacidad: number;
  imagenes: string[];
  user_id: string;
  disponible: boolean;
  created_at: string;
  updated_at: string;
}

// Alimento
export interface Alimento {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  disponibilidad: boolean;
  horario_recogida?: string;
  imagenes: string[];
  user_id: string;
  created_at: string;
  updated_at: string;
}

// Experiencia
export interface Experiencia {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: TipoExperiencia;
  duracion_horas: number;
  capacidad_maxima: number;
  ubicacion: string;
  imagenes: string[];
  user_id: string;
  disponible: boolean;
  created_at: string;
  updated_at: string;
}

// Reserva (unificada para todos los servicios)
export interface Reserva {
  id: string;
  tipo_servicio: TipoServicio;
  servicio_id: string;
  user_id: string;
  fecha_inicio: string;
  fecha_fin?: string;
  cantidad_personas: number;
  precio_total: number;
  estado: ReservaEstado;
  notas?: string;
  created_at: string;
  updated_at: string;
}

// Reseña
export interface Resena {
  id: string;
  servicio_id: string;
  tipo_servicio: TipoServicio;
  user_id: string;
  calificacion: number; // 1-5
  comentario?: string;
  created_at: string;
  updated_at: string;
}

// DTOs para creación

export type CrearAlojamientoDTO = Omit<Alojamiento, 'id' | 'created_at' | 'updated_at'>;
export type CrearAlimentoDTO = Omit<Alimento, 'id' | 'created_at' | 'updated_at'>;
export type CrearExperienciaDTO = Omit<Experiencia, 'id' | 'created_at' | 'updated_at'>;
export type CrearReservaDTO = Omit<Reserva, 'id' | 'created_at' | 'updated_at' | 'estado'>;
export type CrearResenaDTO = Omit<Resena, 'id' | 'created_at' | 'updated_at'>;

// DTOs para actualización

export type ActualizarAlojamientoDTO = Partial<Omit<Alojamiento, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
export type ActualizarAlimentoDTO = Partial<Omit<Alimento, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
export type ActualizarExperienciaDTO = Partial<Omit<Experiencia, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
export type ActualizarReservaDTO = Partial<Omit<Reserva, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;

// Respuestas de API

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
