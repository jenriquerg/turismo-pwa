// ============================================
// REPOSITORY - Alojamientos
// ============================================

import { BaseRepository } from './BaseRepository';
import type { Alojamiento } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export class AlojamientoRepository extends BaseRepository<Alojamiento> {
  constructor(supabaseClient: SupabaseClient) {
    super('alojamientos', supabaseClient);
  }

  /**
   * Buscar alojamientos disponibles
   */
  async findDisponibles(): Promise<Alojamiento[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('disponible', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error al obtener alojamientos disponibles: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Buscar alojamientos por ubicación
   */
  async findByUbicacion(ubicacion: string): Promise<Alojamiento[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('ubicacion', `%${ubicacion}%`)
      .eq('disponible', true);

    if (error) {
      throw new Error(`Error al buscar por ubicación: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Buscar alojamientos por capacidad mínima
   */
  async findByCapacidad(capacidadMinima: number): Promise<Alojamiento[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('capacidad', capacidadMinima)
      .eq('disponible', true);

    if (error) {
      throw new Error(`Error al buscar por capacidad: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Buscar alojamientos por usuario propietario
   */
  async findByUserId(userId: string): Promise<Alojamiento[]> {
    return this.findWhere({ user_id: userId });
  }
}
