import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// could be removed once vite aliases are done
import tsconfigPaths from 'vite-jsconfig-paths';
import dns from 'dns';

// could be removed once node version is 17+
dns.setDefaultResultOrder('verbatim');

export default ({ mode }) => {
  // import.meta.env doesn't exist at this moment
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    server: {
      // imgur forbids accessing its files from 127.0.0.1 (vite default host)
      host: env.VITE_HOST,
      port: Number(env.VITE_PORT),
      proxy: {
        [env.VITE_API_PATH]: env.VITE_API_SERVER
      }
    },
    plugins: [tsconfigPaths(), react()]
  });
};
