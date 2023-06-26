import { defineConfig, loadEnv } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import dns from 'dns';
import path from 'node:path';

// could be removed once node version is 17+
dns.setDefaultResultOrder('verbatim');

const config = ({ mode }) => {
  // import.meta.env doesn't exist at this moment
  const { VITE_PORT, VITE_HOST, VITE_API_PATH, VITE_API_SERVER, VITE_SOCKET_SERVER, VITE_SOCKET_PATH } = loadEnv(
    mode,
    process.cwd()
  );

  return defineConfig({
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    },
    server: {
      // imgur forbids accessing its files from 127.0.0.1 (vite default host)
      host: VITE_HOST,
      port: Number(VITE_PORT),
      proxy: {
        [VITE_API_PATH]: VITE_API_SERVER,
        [VITE_SOCKET_PATH]: {
          target: VITE_SOCKET_SERVER,
          ws: true,
        },
      }
    },
    plugins: [reactPlugin()]
  });
};

export default config;
