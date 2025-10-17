// ============================================
// API ROUTE - Reseña por ID
// ============================================
// DELETE /api/resenas/[id] - Eliminar reseña

import { NextRequest, NextResponse } from 'next/server';
import { ResenaController } from '@/controllers';

const controller = new ResenaController();

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const result = await controller.delete(id);
  
  return NextResponse.json(result, { 
    status: result.success ? 200 : 400 
  });
}
