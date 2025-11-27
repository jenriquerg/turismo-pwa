// Cliente Supabase para el navegador (Singleton Pattern)

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

class SupabaseClientSingleton {
  private static instance: SupabaseClient | null = null;

  private constructor() {}
  public static getInstance(): SupabaseClient {
    if (!this.instance) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
          'Faltan las variables de entorno de Supabase. ' +
          'Asegúrate de configurar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY'
        );
      }

      this.instance = createBrowserClient(supabaseUrl, supabaseAnonKey);
    }

    return this.instance;
  }

  public static resetInstance(): void {
    this.instance = null;
  }
}

// Helper function to get the Supabase client instance
export function getSupabaseClient(): SupabaseClient {
  return SupabaseClientSingleton.getInstance();
}

export { SupabaseClientSingleton };
