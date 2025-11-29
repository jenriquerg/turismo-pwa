// ============================================
// API ROUTE - Alojamientos
// ============================================
// GET /api/alojamientos - Obtener todos los alojamientos
// GET /api/alojamientos?id=xxx - Obtener alojamiento por ID
// GET /api/alojamientos?userId=xxx - Por proveedor
// POST /api/alojamientos - Crear nuevo alojamiento
// PUT /api/alojamientos?id=xxx - Actualizar alojamiento
// DELETE /api/alojamientos?id=xxx - Eliminar alojamiento

import { NextRequest, NextResponse } from 'next/server';
import { AlojamientoController } from '@/controllers';
import { createSupabaseServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const controller = new AlojamientoController(supabase);
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const ubicacion = searchParams.get('ubicacion');
  const capacidad = searchParams.get('capacidad');
  const disponible = searchParams.get('disponible');
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

  // Buscar por ubicación
  if (ubicacion) {
    const result = await controller.searchByUbicacion(ubicacion);
    return NextResponse.json(result);
  }

  // Buscar por capacidad
  if (capacidad) {
    const result = await controller.searchByCapacidad(parseInt(capacidad));
    return NextResponse.json(result);
  }

  // Filtrar solo disponibles
  if (disponible === 'true') {
    const result = await controller.getDisponibles();
    return NextResponse.json(result);
  }

  // Obtener todos
  const result = await controller.getAll();
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const controller = new AlojamientoController(supabase);

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
    const supabase = await createSupabaseServerClient();
    const controller = new AlojamientoController(supabase);

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
  const supabase = await createSupabaseServerClient();
  const controller = new AlojamientoController(supabase);

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
