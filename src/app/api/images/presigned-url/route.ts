export async function POST(req: Request) {
  const upstreamUrl = process.env.UPSTREAM_URL!; // 예: S3 presign 엔드포인트
  // 복사한 헤더에서 hop-by-hop 헤더 제거
  const headers = new Headers(req.headers);
  [
    'host',
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailers',
    'transfer-encoding',
    'upgrade',
  ].forEach((h) => headers.delete(h));

  // upstream으로 요청 포워딩 (스트리밍)
  const upstreamRes = await fetch(upstreamUrl, {
    method: req.method,
    headers,
    body: req.body,
  });

  // upstream 응답 헤더도 필터링 후 그대로 반환
  const resHeaders = new Headers(upstreamRes.headers);
  ['transfer-encoding', 'connection'].forEach((h) => resHeaders.delete(h));

  return new Response(upstreamRes.body, {
    status: upstreamRes.status,
    headers: resHeaders,
  });
}
