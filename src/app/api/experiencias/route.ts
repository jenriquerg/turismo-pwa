// ============================================
// API ROUTE - Experiencias
// ============================================
// GET /api/experiencias - Obtener todas las experiencias
// GET /api/experiencias?id=xxx - Obtener experiencia por ID
// GET /api/experiencias?disponible=true - Solo disponibles
// GET /api/experiencias?tipo=senderismo - Filtrar por tipo
// GET /api/experiencias?ubicacion=Cali - Filtrar por ubicación
// GET /api/experiencias?userId=xxx - Por proveedor
// POST /api/experiencias - Crear nueva experiencia
// PUT /api/experiencias?id=xxx - Actualizar experiencia
// DELETE /api/experiencias?id=xxx - Eliminar experiencia

import { NextRequest, NextResponse } from 'next/server';
import { ExperienciaController } from '@/controllers';
import { TipoExperiencia } from '@/types';
import { createSupabaseServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const controller = new ExperienciaController(supabase);
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const disponible = searchParams.get('disponible');
  const tipo = searchParams.get('tipo');
  const ubicacion = searchParams.get('ubicacion');
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

  // Buscar por tipo
  if (tipo) {
    const result = await controller.searchByTipo(tipo as TipoExperiencia);
    return NextResponse.json(result);
  }

  // Buscar por ubicación
  if (ubicacion) {
    const result = await controller.searchByUbicacion(ubicacion);
    return NextResponse.json(result);
  }

  // Filtrar solo disponibles
  if (disponible === 'true') {
    const result = await controller.getDisponibles();
    return NextResponse.json(result);
  }

  // Obtener todas
  const result = await controller.getAll();
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const controller = new ExperienciaController(supabase);

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
    const controller = new ExperienciaController(supabase);

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
  const controller = new ExperienciaController(supabase);

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
