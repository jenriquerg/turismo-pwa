// ============================================
// API ROUTE - Alimentos
// ============================================
// GET /api/alimentos - Obtener todos los alimentos
// GET /api/alimentos?id=xxx - Obtener alimento por ID
// GET /api/alimentos?disponibilidad=true - Solo disponibles
// GET /api/alimentos?userId=xxx - Por proveedor
// POST /api/alimentos - Crear nuevo alimento
// PUT /api/alimentos?id=xxx - Actualizar alimento
// DELETE /api/alimentos?id=xxx - Eliminar alimento

import { NextRequest, NextResponse } from 'next/server';
import { AlimentoController } from '@/controllers';

const controller = new AlimentoController();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const disponibilidad = searchParams.get('disponibilidad');
  const userId = searchParams.get('userId');

  // Obtener por ID
  if (id) {
    const result = await controller.getById(id);
    return NextResponse.json(result, {
      status: result.success ? 200 : 404
    });
  }

  // Obtener por proveedor
  if (userId) {
    const result = await controller.getByProveedor(userId);
    return NextResponse.json(result);
  }

  // Filtrar solo disponibles
  if (disponibilidad === 'true') {
    const result = await controller.getDisponibles();
    return NextResponse.json(result);
  }

  // Obtener todos
  const result = await controller.getAll();
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

export async function PUT(request: NextRequest) {
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
    const result = await controller.update(id, body);

    return NextResponse.json(result, {
      status: result.success ? 200 : 400
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
