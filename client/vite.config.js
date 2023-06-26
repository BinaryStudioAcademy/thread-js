import { fileURLToPath } from 'node:url';

import reactPlugin from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const config = ({ mode }) => {
  // import.meta.env doesn't exist at this moment
  const {
    VITE_PORT,
    VITE_HOST,
    VITE_API_PATH,
    VITE_API_SERVER,
    VITE_SOCKET_SERVER,
    VITE_SOCKET_PATH
  } = loadEnv(mode, process.cwd());

  return defineConfig({
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('src', import.meta.url))
      }
    },
    server: {
      host: VITE_HOST,
      port: Number(VITE_PORT),
      proxy: {
        [VITE_API_PATH]: VITE_API_SERVER,
        [VITE_SOCKET_PATH]: {
          target: VITE_SOCKET_SERVER,
          ws: true
        }
      }
    },
    plugins: [reactPlugin()]
  });
};

export default config;
