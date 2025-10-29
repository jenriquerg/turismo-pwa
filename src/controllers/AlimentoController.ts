// ============================================
// CONTROLLER - Alimentos
// ============================================
// Maneja la lógica de negocio para alimentos

import { AlimentoRepository } from '@/repositories';
import type { CrearAlimentoDTO, ActualizarAlimentoDTO, ApiResponse, Alimento } from '@/types';

export class AlimentoController {
  private repository: AlimentoRepository;

  constructor() {
    this.repository = new AlimentoRepository();
  }

  // Obtener todos los alimentos
  async getAll(): Promise<ApiResponse<Alimento[]>> {
    try {
      const alimentos = await this.repository.findAll();
      return {
        success: true,
        data: alimentos,
        message: 'Alimentos obtenidos exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener alimentos'
      };
    }
  }

  // Obtener por ID
  async getById(id: string): Promise<ApiResponse<Alimento>> {
    try {
      const alimento = await this.repository.findById(id);

      if (!alimento) {
        return {
          success: false,
          error: 'Alimento no encontrado'
        };
      }

      return {
        success: true,
        data: alimento,
        message: 'Alimento encontrado'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener alimento'
      };
    }
  }

  // Obtener solo disponibles
  async getDisponibles(): Promise<ApiResponse<Alimento[]>> {
    try {
      const alimentos = await this.repository.findDisponibles();
      return {
        success: true,
        data: alimentos,
        message: 'Alimentos disponibles obtenidos exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener alimentos'
      };
    }
  }

  // Buscar por proveedor
  async getByProveedor(userId: string): Promise<ApiResponse<Alimento[]>> {
    try {
      const alimentos = await this.repository.findByUserId(userId);
      return {
        success: true,
        data: alimentos,
        message: 'Alimentos del proveedor obtenidos exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener alimentos'
      };
    }
  }

  // Crear nuevo alimento
  async create(data: CrearAlimentoDTO): Promise<ApiResponse<Alimento>> {
    try {
      // Validaciones básicas
      if (!data.nombre || data.nombre.trim() === '') {
        return {
          success: false,
          error: 'El nombre es requerido'
        };
      }

      if (!data.precio || data.precio <= 0) {
        return {
          success: false,
          error: 'El precio debe ser mayor a 0'
        };
      }

      const alimento = await this.repository.create(data);

      return {
        success: true,
        data: alimento,
        message: 'Alimento creado exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear alimento'
      };
    }
  }

  // Actualizar alimento
  async update(id: string, data: ActualizarAlimentoDTO): Promise<ApiResponse<Alimento>> {
    try {
      // Validar que existe
      const exists = await this.repository.findById(id);
      if (!exists) {
        return {
          success: false,
          error: 'Alimento no encontrado'
        };
      }

      // Validar precio si se está actualizando
      if (data.precio !== undefined && data.precio <= 0) {
        return {
          success: false,
          error: 'El precio debe ser mayor a 0'
        };
      }

      const alimento = await this.repository.update(id, data);

      return {
        success: true,
        data: alimento,
        message: 'Alimento actualizado exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar alimento'
      };
    }
  }

  // Eliminar alimento
  async delete(id: string): Promise<ApiResponse<void>> {
    try {
      const exists = await this.repository.findById(id);
      if (!exists) {
        return {
          success: false,
          error: 'Alimento no encontrado'
        };
      }

      await this.repository.delete(id);

      return {
        success: true,
        message: 'Alimento eliminado exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar alimento'
      };
    }
  }
}
