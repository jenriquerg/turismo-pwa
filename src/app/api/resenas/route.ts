// ============================================
// API ROUTE - Reseñas
// ============================================
// GET /api/resenas?servicioId=xxx - Obtener reseñas de un servicio
// GET /api/resenas?userId=xxx - Obtener reseñas de un usuario
// POST /api/resenas - Crear nueva reseña
// DELETE /api/resenas?id=xxx - Eliminar reseña

import { NextRequest, NextResponse } from 'next/server';
import { ResenaController } from '@/controllers';
import { createSupabaseServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const controller = new ResenaController(supabase);
  const searchParams = request.nextUrl.searchParams;
  const servicioId = searchParams.get('servicioId');
  const userId = searchParams.get('userId');
  const estadisticas = searchParams.get('estadisticas');

  // Obtener estadísticas de un servicio
  if (servicioId && estadisticas === 'true') {
    const result = await controller.getEstadisticas(servicioId);
    return NextResponse.json(result);
  }

  // Obtener reseñas por servicio
  if (servicioId) {
    const result = await controller.getByServicioId(servicioId);
    return NextResponse.json(result);
  }

  // Obtener reseñas por usuario
  if (userId) {
    const result = await controller.getByUserId(userId);
    return NextResponse.json(result);
  }

  return NextResponse.json(
    { success: false, error: 'Se requiere servicioId o userId' },
    { status: 400 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const controller = new ResenaController(supabase);

    const body = await request.json();
    const result = await controller.create(body);

    return NextResponse.json(result, {
      status: result.success ? 201 : 400
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error al procesar la solicitud'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const controller = new ResenaController(supabase);

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Se requiere el parámetro id' },
      { status: 400 }
    );
  }

  const result = await controller.delete(id);

  return NextResponse.json(result, {
    status: result.success ? 200 : 400
  });
}
