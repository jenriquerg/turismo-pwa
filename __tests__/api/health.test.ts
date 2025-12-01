import { GET } from '@/app/api/health/route';
import { NextRequest } from 'next/server';

describe('API /api/health', () => {
  it('debería retornar status ok', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('ok');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('environment');
  });

  it('debería retornar un timestamp válido', async () => {
    const response = await GET();
    const data = await response.json();

    const timestamp = new Date(data.timestamp);
    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.getTime()).not.toBeNaN();
  });

  it('debería incluir información del environment', async () => {
    const response = await GET();
    const data = await response.json();

    expect(typeof data.environment).toBe('string');
  });
});
