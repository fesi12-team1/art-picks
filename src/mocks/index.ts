export async function initMocks() {
  if (process.env.NODE_ENV !== 'development') return;
  const { server } = await import('./server');
  server.listen();
}
