// ============================================
// REPOSITORY - Reseñas
// ============================================

import { BaseRepository } from './BaseRepository';
import type { Resena } from '@/types';
import { TipoServicio } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export class ResenaRepository extends BaseRepository<Resena> {
  constructor(supabaseClient: SupabaseClient) {
    super('resenas', supabaseClient);
  }

  /**
   * Buscar reseñas por servicio
   */
  async findByServicioId(servicioId: string): Promise<Resena[]> {
    return this.findWhere({ servicio_id: servicioId });
  }

  /**
   * Buscar reseñas por usuario
   */
  async findByUserId(userId: string): Promise<Resena[]> {
    return this.findWhere({ user_id: userId });
  }

  /**
   * Buscar reseñas por tipo de servicio
   */
  async findByTipoServicio(tipoServicio: TipoServicio): Promise<Resena[]> {
    return this.findWhere({ tipo_servicio: tipoServicio });
  }

  /**
   * Obtener promedio de calificación de un servicio
   */
  async getPromedioCalificacion(servicioId: string): Promise<number> {
    const resenas = await this.findByServicioId(servicioId);

    if (resenas.length === 0) return 0;

    const suma = resenas.reduce((acc, resena) => acc + resena.calificacion, 0);
    return suma / resenas.length;
  }

  /**
   * Obtener estadísticas de reseñas de un servicio
   */
  async getEstadisticas(servicioId: string) {
    const resenas = await this.findByServicioId(servicioId);

    const total = resenas.length;
    const promedio = total > 0
      ? resenas.reduce((acc, r) => acc + r.calificacion, 0) / total
      : 0;

    const distribucion = {
      5: resenas.filter(r => r.calificacion === 5).length,
      4: resenas.filter(r => r.calificacion === 4).length,
      3: resenas.filter(r => r.calificacion === 3).length,
      2: resenas.filter(r => r.calificacion === 2).length,
      1: resenas.filter(r => r.calificacion === 1).length,
    };

    return {
      total,
      promedio: Math.round(promedio * 10) / 10,
      distribucion,
    };
  }
}
