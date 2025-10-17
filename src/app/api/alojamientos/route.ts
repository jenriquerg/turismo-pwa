// ============================================
// API ROUTE - Alojamientos
// ============================================
// GET /api/alojamientos - Obtener todos los alojamientos
// POST /api/alojamientos - Crear nuevo alojamiento

import { NextRequest, NextResponse } from 'next/server';
import { AlojamientoController } from '@/controllers';

const controller = new AlojamientoController();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ubicacion = searchParams.get('ubicacion');
  const capacidad = searchParams.get('capacidad');
  const disponible = searchParams.get('disponible');

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
