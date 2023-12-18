import reactPlugin, { type Options } from '@vitejs/plugin-react';
import { type ConfigEnv, defineConfig, loadEnv, type PluginOption } from 'vite';
import tsConfigPathsPlugin from 'vite-tsconfig-paths';

const viteReactPlugin = reactPlugin as unknown as (
  options?: Options
) => PluginOption[];

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
  // import.meta.env doesn't exist at this moment
  const {
    VITE_APP_PORT,
    VITE_APP_HOST,
    VITE_API_PATH,
    VITE_API_SERVER,
    VITE_SOCKET_SERVER,
    VITE_SOCKET_PATH
  } = loadEnv(mode, process.cwd());

  return defineConfig({
    build: {
      outDir: 'build'
    },
    server: {
      host: VITE_APP_HOST as string,
      port: Number(VITE_APP_PORT),
      proxy: {
        [VITE_API_PATH as string]: VITE_API_SERVER as string,
        [VITE_SOCKET_PATH as string]: {
          target: VITE_SOCKET_SERVER,
          ws: true
        }
      }
    },
    plugins: [tsConfigPathsPlugin(), viteReactPlugin()]
  });
};

export default config;
