import { defineConfig, loadEnv } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
// could be removed once vite aliases are done
import jsconfigPaths from 'vite-jsconfig-paths';
import dns from 'dns';

// could be removed once node version is 17+
dns.setDefaultResultOrder('verbatim');

const config = ({ mode }) => {
  // import.meta.env doesn't exist at this moment
  const { VITE_PORT, VITE_HOST, VITE_API_PATH, VITE_API_SERVER } = loadEnv(
    mode,
    process.cwd()
  );

  return defineConfig({
    server: {
      // imgur forbids accessing its files from 127.0.0.1 (vite default host)
      host: VITE_HOST,
      port: Number(VITE_PORT),
      proxy: {
        [VITE_API_PATH]: VITE_API_SERVER
      }
    },
    plugins: [jsconfigPaths(), reactPlugin()]
  });
};

export default config;
