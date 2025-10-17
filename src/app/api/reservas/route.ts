// ============================================
// API ROUTE - Reservas
// ============================================
// GET /api/reservas?userId=xxx - Obtener reservas de un usuario
// POST /api/reservas - Crear nueva reserva

import { NextRequest, NextResponse } from 'next/server';
import { ReservaController } from '@/controllers';

const controller = new ReservaController();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  const activas = searchParams.get('activas');

  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'Se requiere el parámetro userId' },
      { status: 400 }
    );
  }

  // Obtener solo reservas activas
  if (activas === 'true') {
    const result = await controller.getActivasByUserId(userId);
    return NextResponse.json(result);
  }

  // Obtener todas las reservas del usuario
  const result = await controller.getByUserId(userId);
  return NextResponse.json(result);
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
