// ============================================
// CONTROLLER - Alojamientos (MVC)
// ============================================
// Este controller maneja la lógica de negocio para alojamientos

import { AlojamientoRepository } from '@/repositories/AlojamientoRepository';
import { ServicioTuristicoFactory } from '@/factories/ServicioTuristicoFactory';
import type { CrearAlojamientoDTO, ActualizarAlojamientoDTO, Alojamiento, ApiResponse } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export class AlojamientoController {
  private repository: AlojamientoRepository;

  constructor(supabaseClient: SupabaseClient) {
    this.repository = new AlojamientoRepository(supabaseClient);
  }

  /**
   * Obtener todos los alojamientos
   */
  async getAll(): Promise<ApiResponse<Alojamiento[]>> {
    try {
      const alojamientos = await this.repository.findAll();
      return {
        success: true,
        data: alojamientos,
        message: `Se encontraron ${alojamientos.length} alojamientos`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Obtener alojamientos disponibles
   */
  async getDisponibles(): Promise<ApiResponse<Alojamiento[]>> {
    try {
      const alojamientos = await this.repository.findDisponibles();
      return {
        success: true,
        data: alojamientos,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Obtener un alojamiento por ID
   */
  async getById(id: string): Promise<ApiResponse<Alojamiento>> {
    try {
      const alojamiento = await this.repository.findById(id);
      
      if (!alojamiento) {
        return {
          success: false,
          error: 'Alojamiento no encontrado',
        };
      }

      return {
        success: true,
        data: alojamiento,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Crear un nuevo alojamiento
   */
  async create(data: CrearAlojamientoDTO): Promise<ApiResponse<Alojamiento>> {
    try {
      // Usar el Factory para validar y preparar los datos
      const alojamientoData = ServicioTuristicoFactory.createAlojamiento(data);
      
      // Crear en la base de datos
      const nuevoAlojamiento = await this.repository.create(alojamientoData);

      return {
        success: true,
        data: nuevoAlojamiento,
        message: 'Alojamiento creado exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear alojamiento',
      };
    }
  }

  /**
   * Actualizar un alojamiento existente
   */
  async update(id: string, data: ActualizarAlojamientoDTO): Promise<ApiResponse<Alojamiento>> {
    try {
      const alojamiento = await this.repository.update(id, data);
      return {
        success: true,
        data: alojamiento,
        message: 'Alojamiento actualizado exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar alojamiento',
      };
    }
  }

  /**
   * Eliminar un alojamiento
   */
  async delete(id: string): Promise<ApiResponse<boolean>> {
    try {
      await this.repository.delete(id);
      return {
        success: true,
        data: true,
        message: 'Alojamiento eliminado exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar alojamiento',
      };
    }
  }

  /**
   * Buscar alojamientos por ubicación
   */
  async searchByUbicacion(ubicacion: string): Promise<ApiResponse<Alojamiento[]>> {
    try {
      const alojamientos = await this.repository.findByUbicacion(ubicacion);
      return {
        success: true,
        data: alojamientos,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error en la búsqueda',
      };
    }
  }

  /**
   * Buscar alojamientos por capacidad
   */
  async searchByCapacidad(capacidad: number): Promise<ApiResponse<Alojamiento[]>> {
    try {
      const alojamientos = await this.repository.findByCapacidad(capacidad);
      return {
        success: true,
        data: alojamientos,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error en la búsqueda',
      };
    }
  }
}
