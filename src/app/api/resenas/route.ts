// ============================================
// API ROUTE - Reseñas
// ============================================
// GET /api/resenas?servicioId=xxx - Obtener reseñas de un servicio
// GET /api/resenas?userId=xxx - Obtener reseñas de un usuario
// POST /api/resenas - Crear nueva reseña

import { NextRequest, NextResponse } from 'next/server';
import { ResenaController } from '@/controllers';

const controller = new ResenaController();

export async function GET(request: NextRequest) {
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
