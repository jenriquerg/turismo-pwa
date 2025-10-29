// ============================================
// CONTROLLER - Experiencias
// ============================================
// Maneja la lógica de negocio para experiencias

import { ExperienciaRepository } from '@/repositories';
import type { CrearExperienciaDTO, ActualizarExperienciaDTO, ApiResponse, Experiencia, TipoExperiencia } from '@/types';

export class ExperienciaController {
  private repository: ExperienciaRepository;

  constructor() {
    this.repository = new ExperienciaRepository();
  }

  // Obtener todas las experiencias
  async getAll(): Promise<ApiResponse<Experiencia[]>> {
    try {
      const experiencias = await this.repository.findAll();
      return {
        success: true,
        data: experiencias,
        message: 'Experiencias obtenidas exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener experiencias'
      };
    }
  }

  // Obtener por ID
  async getById(id: string): Promise<ApiResponse<Experiencia>> {
    try {
      const experiencia = await this.repository.findById(id);

      if (!experiencia) {
        return {
          success: false,
          error: 'Experiencia no encontrada'
        };
      }

      return {
        success: true,
        data: experiencia,
        message: 'Experiencia encontrada'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener experiencia'
      };
    }
  }

  // Obtener solo disponibles
  async getDisponibles(): Promise<ApiResponse<Experiencia[]>> {
    try {
      const experiencias = await this.repository.findDisponibles();
      return {
        success: true,
        data: experiencias,
        message: 'Experiencias disponibles obtenidas exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener experiencias'
      };
    }
  }

  // Buscar por ubicación
  async searchByUbicacion(ubicacion: string): Promise<ApiResponse<Experiencia[]>> {
    try {
      const experiencias = await this.repository.findByUbicacion(ubicacion);
      return {
        success: true,
        data: experiencias,
        message: `Experiencias en ${ubicacion} obtenidas exitosamente`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al buscar experiencias'
      };
    }
  }

  // Buscar por tipo
  async searchByTipo(tipo: TipoExperiencia): Promise<ApiResponse<Experiencia[]>> {
    try {
      const experiencias = await this.repository.findByTipo(tipo);
      return {
        success: true,
        data: experiencias,
        message: `Experiencias de tipo ${tipo} obtenidas exitosamente`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al buscar experiencias'
      };
    }
  }

  // Buscar por proveedor
  async getByProveedor(userId: string): Promise<ApiResponse<Experiencia[]>> {
    try {
      const experiencias = await this.repository.findByUserId(userId);
      return {
        success: true,
        data: experiencias,
        message: 'Experiencias del proveedor obtenidas exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener experiencias'
      };
    }
  }

  // Crear nueva experiencia
  async create(data: CrearExperienciaDTO): Promise<ApiResponse<Experiencia>> {
    try {
      // Validaciones básicas
      if (!data.titulo || data.titulo.trim() === '') {
        return {
          success: false,
          error: 'El título es requerido'
        };
      }

      if (!data.precio || data.precio <= 0) {
        return {
          success: false,
          error: 'El precio debe ser mayor a 0'
        };
      }

      if (!data.duracion_horas || data.duracion_horas <= 0) {
        return {
          success: false,
          error: 'La duración debe ser mayor a 0 horas'
        };
      }

      if (!data.capacidad_maxima || data.capacidad_maxima <= 0) {
        return {
          success: false,
          error: 'La capacidad máxima debe ser mayor a 0'
        };
      }

      const experiencia = await this.repository.create(data);

      return {
        success: true,
        data: experiencia,
        message: 'Experiencia creada exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear experiencia'
      };
    }
  }

  // Actualizar experiencia
  async update(id: string, data: ActualizarExperienciaDTO): Promise<ApiResponse<Experiencia>> {
    try {
      // Validar que existe
      const exists = await this.repository.findById(id);
      if (!exists) {
        return {
          success: false,
          error: 'Experiencia no encontrada'
        };
      }

      // Validaciones
      if (data.precio !== undefined && data.precio <= 0) {
        return {
          success: false,
          error: 'El precio debe ser mayor a 0'
        };
      }

      if (data.duracion_horas !== undefined && data.duracion_horas <= 0) {
        return {
          success: false,
          error: 'La duración debe ser mayor a 0 horas'
        };
      }

      if (data.capacidad_maxima !== undefined && data.capacidad_maxima <= 0) {
        return {
          success: false,
          error: 'La capacidad máxima debe ser mayor a 0'
        };
      }

      const experiencia = await this.repository.update(id, data);

      return {
        success: true,
        data: experiencia,
        message: 'Experiencia actualizada exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar experiencia'
      };
    }
  }

  // Eliminar experiencia
  async delete(id: string): Promise<ApiResponse<void>> {
    try {
      const exists = await this.repository.findById(id);
      if (!exists) {
        return {
          success: false,
          error: 'Experiencia no encontrada'
        };
      }

      await this.repository.delete(id);

      return {
        success: true,
        message: 'Experiencia eliminada exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar experiencia'
      };
    }
  }
}
