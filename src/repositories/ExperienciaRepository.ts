// ============================================
// REPOSITORY - Experiencias
// ============================================

import { BaseRepository } from './BaseRepository';
import type { Experiencia } from '@/types';
import { TipoExperiencia } from '@/types';

export class ExperienciaRepository extends BaseRepository<Experiencia> {
  constructor() {
    super('experiencias');
  }

  /**
   * Buscar experiencias disponibles
   */
  async findDisponibles(): Promise<Experiencia[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('disponible', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error al obtener experiencias disponibles: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Buscar experiencias por tipo
   */
  async findByTipo(tipo: TipoExperiencia): Promise<Experiencia[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('tipo', tipo)
      .eq('disponible', true);

    if (error) {
      throw new Error(`Error al buscar por tipo: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Buscar experiencias por ubicación
   */
  async findByUbicacion(ubicacion: string): Promise<Experiencia[]> {
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
   * Buscar experiencias por usuario propietario
   */
  async findByUserId(userId: string): Promise<Experiencia[]> {
    return this.findWhere({ user_id: userId });
  }
}
