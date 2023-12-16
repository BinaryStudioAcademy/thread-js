const { VITE_SOCKET_SERVER, VITE_API_PATH } = import.meta.env;

const ENV = {
  SOCKET_URL: VITE_SOCKET_SERVER as string,
  API_PATH: VITE_API_PATH as string
};

export { ENV };
