import { jest } from '@jest/globals';
import { NextRequest } from 'next/server';

const getAccessTokenMock = jest.fn<() => Promise<string | undefined>>();
const getRefreshTokenMock = jest.fn<() => Promise<string | undefined>>();
const refreshAccessTokenMock = jest.fn<() => Promise<boolean>>();
const getBackendUrlMock = jest.fn<(url: string | URL) => URL>();
const getSafeHeadersMock =
  jest.fn<(headers: Headers, token?: string) => Headers>();

jest.unstable_mockModule('../cookies', () => ({
  getAccessToken: getAccessTokenMock,
  getRefreshToken: getRefreshTokenMock,
}));

jest.unstable_mockModule('./refresh', () => ({
  refreshAccessToken: refreshAccessTokenMock,
}));

jest.unstable_mockModule('./utils', () => ({
  getBackendUrl: getBackendUrlMock,
  getSafeHeaders: getSafeHeadersMock,
}));

const { default: handleRequest } = await import('./handleRequest');

describe('handleRequest', () => {
  const fetchSpy = jest.spyOn(global, 'fetch');

  beforeEach(() => {
    process.env.API_URL = 'https://backend.test';

    fetchSpy.mockReset();
    getAccessTokenMock.mockReset();
    getRefreshTokenMock.mockReset();
    refreshAccessTokenMock.mockReset();
    getBackendUrlMock.mockReset();
    getSafeHeadersMock.mockReset();

    getBackendUrlMock.mockReturnValue(new URL('https://backend.test/api/any'));
    getSafeHeadersMock.mockImplementation((incomingHeaders, token) => {
      const headers = new Headers(incomingHeaders);
      headers.set('Accept', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    });
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });

  test('인증이 필요한 요청에서 refresh token이 없으면 401을 반환한다', async () => {
    const request = new NextRequest('http://localhost/api/sessions', {
      method: 'GET',
    });

    getAccessTokenMock.mockResolvedValue('access-token');
    getRefreshTokenMock.mockResolvedValue(undefined);

    const response = await handleRequest(request, true);

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: 'UNAUTHORIZED',
        message: '인증이 필요합니다.',
      },
    });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  test('백엔드 401 응답 시 토큰 갱신 후 1회 재시도한다', async () => {
    const request = new NextRequest('http://localhost/api/sessions', {
      method: 'GET',
      headers: {
        'X-Request-Id': 'retry-case',
      },
    });

    getAccessTokenMock
      .mockResolvedValueOnce('expired-token')
      .mockResolvedValueOnce('new-token');
    getRefreshTokenMock.mockResolvedValue('refresh-token');
    refreshAccessTokenMock.mockResolvedValue(true);

    fetchSpy
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'expired' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );

    const response = await handleRequest(request, true);

    expect(refreshAccessTokenMock).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy.mock.calls[0][0]).toBe('https://backend.test/api/any');
    expect(fetchSpy.mock.calls[1][0]).toBe('https://backend.test/api/any');
    expect(fetchSpy.mock.calls[0][1]?.headers).toBeInstanceOf(Headers);
    expect(fetchSpy.mock.calls[1][1]?.headers).toBeInstanceOf(Headers);
    expect(
      (fetchSpy.mock.calls[0][1]?.headers as Headers).get('Authorization')
    ).toBe('Bearer expired-token');
    expect(
      (fetchSpy.mock.calls[1][1]?.headers as Headers).get('Authorization')
    ).toBe('Bearer new-token');

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });
});
