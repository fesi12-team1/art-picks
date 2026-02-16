import { ApiError } from '@/lib/error';
import request from './request';

describe('request', () => {
  const fetchSpy = jest.spyOn(global, 'fetch');

  beforeEach(() => {
    fetchSpy.mockReset();
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });

  test('응답이 정상일 때 data 필드를 반환한다', async () => {
    fetchSpy.mockResolvedValue(
      new Response(JSON.stringify({ data: { id: 1, name: 'session' } }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const result = await request<{ id: number; name: string }>('/api/sessions');

    expect(result).toEqual({ id: 1, name: 'session' });
    expect(fetchSpy).toHaveBeenCalledWith('/api/sessions', undefined);
  });

  test('응답이 실패면 ApiError로 매핑한다', async () => {
    fetchSpy.mockResolvedValue(
      new Response(
        JSON.stringify({
          error: { message: '잘못된 요청입니다.', code: 'INVALID_REQUEST' },
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    );

    await expect(request('/api/sessions')).rejects.toMatchObject({
      name: 'ApiError',
      message: '잘못된 요청입니다.',
      status: '400',
      code: 'INVALID_REQUEST',
    });
  });
});
