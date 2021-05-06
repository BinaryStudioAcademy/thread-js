import { config } from 'dotenv';

config();

const {
  APP_PORT,
  SOCKET_PORT,
  SECRET_KEY,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  IMGUR_ID,
  IMGUR_SECRET
} = process.env;

const ENV = {
  APP: {
    PORT: APP_PORT,
    SOCKET_PORT
  },
  JWT: {
    SECRET: SECRET_KEY,
    EXPIRES_IN: '24h'
  },
  DB: {
    DATABASE: DB_NAME,
    USERNAME: DB_USERNAME,
    PASSWORD: DB_PASSWORD,
    HOST: DB_HOST,
    PORT: DB_PORT,
    DIALECT: DB_DIALECT,
    LOGGING: false
  },
  IMGUR: {
    ID: IMGUR_ID,
    SECRET: IMGUR_SECRET,
    FILE_SIZE: 10000000
  }
};

export { ENV };
