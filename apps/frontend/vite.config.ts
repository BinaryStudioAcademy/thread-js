import viteReactPlugin from '@vitejs/plugin-react';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
  // import.meta.env doesn't exist at this moment
  const {
    VITE_API_PATH,
    VITE_APP_HOST,
    VITE_APP_PORT,
    VITE_APP_PROXY_SERVER_URL
  } = loadEnv(mode, process.cwd());

  return defineConfig({
    build: {
      outDir: 'build'
    },
    plugins: [viteReactPlugin()],
    resolve: {
      tsconfigPaths: true
    },
    server: {
      host: VITE_APP_HOST as string,
      port: Number(VITE_APP_PORT),
      proxy: {
        [VITE_API_PATH as string]: {
          changeOrigin: true,
          target: VITE_APP_PROXY_SERVER_URL as string
        }
      }
    }
  });
};

export default config;
