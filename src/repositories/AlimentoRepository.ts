// ============================================
// REPOSITORY - Alimentos
// ============================================

import { BaseRepository } from './BaseRepository';
import type { Alimento } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export class AlimentoRepository extends BaseRepository<Alimento> {
  constructor(supabaseClient: SupabaseClient) {
    super('alimentos', supabaseClient);
  }

  /**
   * Buscar alimentos disponibles
   */
  async findDisponibles(): Promise<Alimento[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('disponibilidad', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error al obtener alimentos disponibles: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Buscar alimentos por usuario propietario
   */
  async findByUserId(userId: string): Promise<Alimento[]> {
    return this.findWhere({ user_id: userId });
  }

  /**
   * Buscar por rango de precio
   */
  async findByPrecioRange(min: number, max: number): Promise<Alimento[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('precio', min)
      .lte('precio', max)
      .eq('disponibilidad', true);

    if (error) {
      throw new Error(`Error al buscar por rango de precio: ${error.message}`);
    }

    return data || [];
  }
}
