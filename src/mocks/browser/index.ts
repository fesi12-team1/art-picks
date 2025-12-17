import { setupWorker } from 'msw/browser';
// import { createPath } from '../core/path';
// import { createAuthClientHandlers } from '../handlers/authClient';
import { bypassHandlers } from '../handlers/bypass';

// const layer = 'proxy' as const;
// const authMode = 'bypass' as const;
// const p = createPath(layer, '');

export const worker = setupWorker(
  ...bypassHandlers
  // ...createAuthClientHandlers(p, authMode)
);
