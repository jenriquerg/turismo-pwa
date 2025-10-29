// ============================================
// API ROUTE - Reservas
// ============================================
// GET /api/reservas?userId=xxx - Obtener reservas de un usuario
// GET /api/reservas?id=xxx - Obtener reserva por ID
// POST /api/reservas - Crear nueva reserva
// PATCH /api/reservas?id=xxx - Actualizar estado de reserva
// DELETE /api/reservas?id=xxx - Eliminar reserva

import { NextRequest, NextResponse } from 'next/server';
import { ReservaController } from '@/controllers';

const controller = new ReservaController();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const userId = searchParams.get('userId');
  const activas = searchParams.get('activas');

  // Obtener por ID
  if (id) {
    const result = await controller.getById(id);
    return NextResponse.json(result, {
      status: result.success ? 200 : 404
    });
  }

  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'Se requiere el parámetro userId o id' },
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

export async function PATCH(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Se requiere el parámetro id' },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (body.estado) {
      const result = await controller.updateEstado(id, body.estado);
      return NextResponse.json(result, {
        status: result.success ? 200 : 400
      });
    }

    return NextResponse.json(
      { success: false, error: 'Se requiere el campo estado' },
      { status: 400 }
    );
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
