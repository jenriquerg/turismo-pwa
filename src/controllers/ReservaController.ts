// ============================================
// CONTROLLER - Reservas (MVC)
// ============================================

import { ReservaRepository } from '@/repositories/ReservaRepository';
import { ReservaFactory } from '@/factories/ReservaFactory';
import type { CrearReservaDTO, Reserva, ApiResponse } from '@/types';
import { ReservaEstado } from '@/types';

export class ReservaController {
  private repository: ReservaRepository;

  constructor() {
    this.repository = new ReservaRepository();
  }

  /**
   * Crear una nueva reserva
   */
  async create(data: CrearReservaDTO): Promise<ApiResponse<Reserva>> {
    try {
      // Usar el Factory para validar y añadir estado inicial
      const reservaData = ReservaFactory.create(data);
      
      // Crear en la base de datos
      const nuevaReserva = await this.repository.create(reservaData);

      return {
        success: true,
        data: nuevaReserva,
        message: 'Reserva creada exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear reserva',
      };
    }
  }

  /**
   * Obtener reservas de un usuario
   */
  async getByUserId(userId: string): Promise<ApiResponse<Reserva[]>> {
    try {
      const reservas = await this.repository.findByUserId(userId);
      return {
        success: true,
        data: reservas,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Obtener reservas activas de un usuario
   */
  async getActivasByUserId(userId: string): Promise<ApiResponse<Reserva[]>> {
    try {
      const reservas = await this.repository.findActivasByUserId(userId);
      return {
        success: true,
        data: reservas,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Obtener una reserva por ID
   */
  async getById(id: string): Promise<ApiResponse<Reserva>> {
    try {
      const reserva = await this.repository.findById(id);
      
      if (!reserva) {
        return {
          success: false,
          error: 'Reserva no encontrada',
        };
      }

      return {
        success: true,
        data: reserva,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Actualizar estado de una reserva
   */
  async updateEstado(id: string, nuevoEstado: ReservaEstado): Promise<ApiResponse<Reserva>> {
    try {
      const reserva = await this.repository.updateEstado(id, nuevoEstado);
      return {
        success: true,
        data: reserva,
        message: `Reserva ${nuevoEstado} exitosamente`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar estado',
      };
    }
  }

  /**
   * Cancelar una reserva
   */
  async cancelar(id: string): Promise<ApiResponse<Reserva>> {
    return this.updateEstado(id, ReservaEstado.CANCELADA);
  }

  /**
   * Confirmar una reserva
   */
  async confirmar(id: string): Promise<ApiResponse<Reserva>> {
    return this.updateEstado(id, ReservaEstado.CONFIRMADA);
  }

  /**
   * Eliminar una reserva
   */
  async delete(id: string): Promise<ApiResponse<boolean>> {
    try {
      await this.repository.delete(id);
      return {
        success: true,
        data: true,
        message: 'Reserva eliminada exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar reserva',
      };
    }
  }
}
