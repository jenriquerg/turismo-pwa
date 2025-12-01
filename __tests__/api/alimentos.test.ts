import { GET, POST, PUT, DELETE } from '@/app/api/alimentos/route';
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
      insert: jest.fn(() => Promise.resolve({ data: null, error: null })),
      update: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({ data: null, error: null })),
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({ data: null, error: null })),
      })),
    })),
  })),
}));

describe('API /api/alimentos', () => {
  describe('GET /api/alimentos', () => {
    it('debería manejar peticiones GET sin parámetros', async () => {
      const request = new NextRequest('http://localhost:3000/api/alimentos');
      const response = await GET(request);

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toBeDefined();
    });

    it('debería aceptar filtro por disponibilidad', async () => {
      const request = new NextRequest('http://localhost:3000/api/alimentos?disponibilidad=true');
      const response = await GET(request);

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toBeDefined();
    });

    it('debería aceptar filtro por ID', async () => {
      const request = new NextRequest('http://localhost:3000/api/alimentos?id=123');
      const response = await GET(request);

      expect([200, 404]).toContain(response.status);
    });
  });

  describe('POST /api/alimentos', () => {
    it('debería manejar creación de alimentos', async () => {
      const mockData = {
        nombre: 'Test Alimento',
        descripcion: 'Descripción de prueba',
        precio: 100,
      };

      const request = new NextRequest('http://localhost:3000/api/alimentos', {
        method: 'POST',
        body: JSON.stringify(mockData),
      });

      const response = await POST(request);
      expect([201, 400]).toContain(response.status);
    });
  });

  describe('DELETE /api/alimentos', () => {
    it('debería requerir parámetro ID para eliminar', async () => {
      const request = new NextRequest('http://localhost:3000/api/alimentos');
      const response = await DELETE(request);

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toContain('id');
    });

    it('debería aceptar parámetro ID', async () => {
      const request = new NextRequest('http://localhost:3000/api/alimentos?id=123');
      const response = await DELETE(request);

      expect([200, 400]).toContain(response.status);
    });
  });
});
