// Clase base para todos los Repositories (CRUD genérico)

import type { SupabaseClient } from '@supabase/supabase-js';

export abstract class BaseRepository<T> {
  protected supabase: SupabaseClient;
  protected tableName: string;

  constructor(tableName: string, supabaseClient: SupabaseClient) {
    this.tableName = tableName;
    this.supabase = supabaseClient;
  }

  async findAll(): Promise<T[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error al obtener ${this.tableName}: ${error.message}`);
    }

    return (data as T[]) || [];
  }

  async findById(id: string): Promise<T | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error al obtener ${this.tableName} por ID: ${error.message}`);
    }

    return data as T;
  }

  async create(data: Partial<T>): Promise<T> {
    const { data: created, error } = await this.supabase
      .from(this.tableName)
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al crear ${this.tableName}: ${error.message}`);
    }

    return created as T;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const { data: updated, error } = await this.supabase
      .from(this.tableName)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al actualizar ${this.tableName}: ${error.message}`);
    }

    return updated as T;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error al eliminar ${this.tableName}: ${error.message}`);
    }

    return true;
  }

  async findWhere(filters: Record<string, unknown>): Promise<T[]> {
    let query = this.supabase.from(this.tableName).select('*');

    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error al buscar ${this.tableName}: ${error.message}`);
    }

    return (data as T[]) || [];
  }
}
