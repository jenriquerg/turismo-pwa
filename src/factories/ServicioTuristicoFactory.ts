// ============================================
// PATRÓN FACTORY - Servicios Turísticos
// ============================================
// Centraliza la creación de servicios turísticos

import type {
  CrearAlojamientoDTO,
  CrearAlimentoDTO,
  CrearExperienciaDTO,
} from '@/types';

export class ServicioTuristicoFactory {
  /**
   * Crea un alojamiento con valores por defecto
   */
  static createAlojamiento(params: CrearAlojamientoDTO): CrearAlojamientoDTO {
    // Validaciones básicas
    if (!params.titulo || params.titulo.trim() === '') {
      throw new Error('El título es obligatorio');
    }

    if (params.precio_noche <= 0) {
      throw new Error('El precio por noche debe ser mayor a 0');
    }

    if (params.capacidad <= 0) {
      throw new Error('La capacidad debe ser mayor a 0');
    }

    return {
      ...params,
      imagenes: params.imagenes || [],
      disponible: params.disponible ?? true,
    };
  }

  /**
   * Crea un alimento con valores por defecto
   */
  static createAlimento(params: CrearAlimentoDTO): CrearAlimentoDTO {
    // Validaciones básicas
    if (!params.nombre || params.nombre.trim() === '') {
      throw new Error('El nombre es obligatorio');
    }

    if (params.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }

    return {
      ...params,
      imagenes: params.imagenes || [],
      disponibilidad: params.disponibilidad ?? true,
    };
  }

  /**
   * Crea una experiencia con valores por defecto
   */
  static createExperiencia(params: CrearExperienciaDTO): CrearExperienciaDTO {
    // Validaciones básicas
    if (!params.titulo || params.titulo.trim() === '') {
      throw new Error('El título es obligatorio');
    }

    if (params.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }

    if (params.duracion_horas <= 0) {
      throw new Error('La duración debe ser mayor a 0');
    }

    if (params.capacidad_maxima <= 0) {
      throw new Error('La capacidad máxima debe ser mayor a 0');
    }

    return {
      ...params,
      imagenes: params.imagenes || [],
      disponible: params.disponible ?? true,
    };
  }

  /**
   * Valida imágenes de un servicio
   */
  static validateImagenes(imagenes: string[]): boolean {
    if (!Array.isArray(imagenes)) {
      throw new Error('Las imágenes deben ser un array');
    }

    // Validar URLs básicas
    const urlPattern = /^(https?:\/\/).+/;
    const todasValidas = imagenes.every(img => urlPattern.test(img));

    if (!todasValidas) {
      throw new Error('Todas las URLs de imágenes deben ser válidas');
    }

    return true;
  }
}
