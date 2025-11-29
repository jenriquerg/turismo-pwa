// ============================================
// REPOSITORY - Reservas
// ============================================

import { BaseRepository } from './BaseRepository';
import type { Reserva } from '@/types';
import { ReservaEstado, TipoServicio } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export class ReservaRepository extends BaseRepository<Reserva> {
  constructor(supabaseClient: SupabaseClient) {
    super('reservas', supabaseClient);
  }

  /**
   * Buscar reservas por usuario
   */
  async findByUserId(userId: string): Promise<Reserva[]> {
    return this.findWhere({ user_id: userId });
  }

  /**
   * Buscar reservas por estado
   */
  async findByEstado(estado: ReservaEstado): Promise<Reserva[]> {
    return this.findWhere({ estado });
  }

  /**
   * Buscar reservas por tipo de servicio
   */
  async findByTipoServicio(tipoServicio: TipoServicio): Promise<Reserva[]> {
    return this.findWhere({ tipo_servicio: tipoServicio });
  }

  /**
   * Buscar reservas de un servicio específico
   */
  async findByServicioId(servicioId: string): Promise<Reserva[]> {
    return this.findWhere({ servicio_id: servicioId });
  }

  /**
   * Obtener reservas activas de un usuario
   */
  async findActivasByUserId(userId: string): Promise<Reserva[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .in('estado', ['pendiente', 'confirmada', 'pagada'])
      .order('fecha_inicio', { ascending: true });

    if (error) {
      throw new Error(`Error al obtener reservas activas: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Actualizar estado de reserva
   */
  async updateEstado(id: string, nuevoEstado: ReservaEstado): Promise<Reserva> {
    return this.update(id, { estado: nuevoEstado } as Partial<Reserva>);
  }

  /**
   * Obtener reservas de los servicios de un proveedor
   */
  async findByProveedorId(proveedorId: string): Promise<Reserva[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .or(`servicio_id.in.(select id from alojamientos where user_id.eq.${proveedorId}),servicio_id.in.(select id from alimentos where user_id.eq.${proveedorId}),servicio_id.in.(select id from experiencias where user_id.eq.${proveedorId})`)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error al obtener reservas del proveedor: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Obtener reservas activas de los servicios de un proveedor
   */
  async findActivasByProveedorId(proveedorId: string): Promise<Reserva[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .or(`servicio_id.in.(select id from alojamientos where user_id.eq.${proveedorId}),servicio_id.in.(select id from alimentos where user_id.eq.${proveedorId}),servicio_id.in.(select id from experiencias where user_id.eq.${proveedorId})`)
      .in('estado', ['pendiente', 'confirmada', 'pagada'])
      .order('fecha_inicio', { ascending: true });

    if (error) {
      throw new Error(`Error al obtener reservas activas del proveedor: ${error.message}`);
    }

    return data || [];
  }
}
