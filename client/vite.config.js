import { defineConfig, loadEnv } from 'vite';
import dns from 'dns';
import react from '@vitejs/plugin-react';

// could be removed once node version is 17+
dns.setDefaultResultOrder('verbatim');

export default ({ mode }) => {
  // import.meta.env doesn't exist at this moment
  const { VITE_API_PATH, VITE_PORT, VITE_HOST, VITE_API_SERVER } = loadEnv(
    mode,
    process.cwd()
  );

  return defineConfig({
    server: {
      // imgur forbids accessing its files from 127.0.0.1 (vite default host)
      host: VITE_HOST,
      port: VITE_PORT,
      proxy: {
        [VITE_API_PATH]: VITE_API_SERVER
      }
    },
    plugins: [react()]
  });
};
