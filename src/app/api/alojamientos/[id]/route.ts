// ============================================
// API ROUTE - Alojamiento por ID
// ============================================
// GET /api/alojamientos/[id] - Obtener alojamiento por ID
// PUT /api/alojamientos/[id] - Actualizar alojamiento
// DELETE /api/alojamientos/[id] - Eliminar alojamiento

import { NextRequest, NextResponse } from 'next/server';
import { AlojamientoController } from '@/controllers';

const controller = new AlojamientoController();

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const result = await controller.getById(id);
  
  return NextResponse.json(result, { 
    status: result.success ? 200 : 404 
  });
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
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

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const result = await controller.delete(id);
  
  return NextResponse.json(result, { 
    status: result.success ? 200 : 400 
  });
}
