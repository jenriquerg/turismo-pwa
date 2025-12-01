import { GET } from '@/app/api/alojamientos/route';
import { NextRequest } from 'next/server';

// Mock de Supabase
jest.mock('@/lib/supabase', () => ({
  createSupabaseServerClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: null, error: null })),
          data: [],
          error: null,
        })),
        data: [],
        error: null,
      })),
    })),
  })),
}));

describe('API /api/alojamientos', () => {
  it('debería manejar peticiones GET correctamente', async () => {
    const request = new NextRequest('http://localhost:3000/api/alojamientos');
    const response = await GET(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeDefined();
  });

  it('debería aceptar parámetros de búsqueda', async () => {
    const request = new NextRequest('http://localhost:3000/api/alojamientos?disponible=true');
    const response = await GET(request);

    expect(response.status).toBe(200);
  });

  it('debería permitir búsqueda por ID', async () => {
    const request = new NextRequest('http://localhost:3000/api/alojamientos?id=test-id');
    const response = await GET(request);

    expect([200, 404]).toContain(response.status);
  });
});
