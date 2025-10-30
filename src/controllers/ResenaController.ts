// ============================================
// CONTROLLER - Reseñas (MVC)
// ============================================

import { ResenaRepository } from '@/repositories/ResenaRepository';
import type { CrearResenaDTO, Resena, ApiResponse } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export class ResenaController {
  private repository: ResenaRepository;

  constructor(supabaseClient: SupabaseClient) {
    this.repository = new ResenaRepository(supabaseClient);
  }

  /**
   * Crear una nueva reseña
   */
  async create(data: CrearResenaDTO): Promise<ApiResponse<Resena>> {
    try {
      // Validar calificación
      if (data.calificacion < 1 || data.calificacion > 5) {
        return {
          success: false,
          error: 'La calificación debe estar entre 1 y 5',
        };
      }

      const nuevaResena = await this.repository.create(data);

      return {
        success: true,
        data: nuevaResena,
        message: 'Reseña creada exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear reseña',
      };
    }
  }

  /**
   * Obtener reseñas de un servicio
   */
  async getByServicioId(servicioId: string): Promise<ApiResponse<Resena[]>> {
    try {
      const resenas = await this.repository.findByServicioId(servicioId);
      return {
        success: true,
        data: resenas,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Obtener reseñas de un usuario
   */
  async getByUserId(userId: string): Promise<ApiResponse<Resena[]>> {
    try {
      const resenas = await this.repository.findByUserId(userId);
      return {
        success: true,
        data: resenas,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Obtener promedio de calificación de un servicio
   */
  async getPromedio(servicioId: string): Promise<ApiResponse<number>> {
    try {
      const promedio = await this.repository.getPromedioCalificacion(servicioId);
      return {
        success: true,
        data: promedio,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Obtener estadísticas completas de reseñas de un servicio
   */
  async getEstadisticas(servicioId: string): Promise<ApiResponse<{
    total: number;
    promedio: number;
    distribucion: Record<number, number>;
  }>> {
    try {
      const estadisticas = await this.repository.getEstadisticas(servicioId);
      return {
        success: true,
        data: estadisticas,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Eliminar una reseña
   */
  async delete(id: string): Promise<ApiResponse<boolean>> {
    try {
      await this.repository.delete(id);
      return {
        success: true,
        data: true,
        message: 'Reseña eliminada exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar reseña',
      };
    }
  }
}
