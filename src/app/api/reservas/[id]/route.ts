// ============================================
// API ROUTE - Reserva por ID
// ============================================
// GET /api/reservas/[id] - Obtener reserva por ID
// DELETE /api/reservas/[id] - Eliminar reserva
// PATCH /api/reservas/[id] - Actualizar estado de reserva

import { NextRequest, NextResponse } from 'next/server';
import { ReservaController } from '@/controllers';

const controller = new ReservaController();

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

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
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

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const result = await controller.delete(id);
  
  return NextResponse.json(result, { 
    status: result.success ? 200 : 400 
  });
}
