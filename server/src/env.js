import dotenv from 'dotenv';

dotenv.config();

const env = {
  app: {
    port: process.env.APP_PORT,
    socketPort: process.env.SOCKET_PORT,
    secret: process.env.SECRET_KEY
  },
  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false
  },
  imgur: {
    imgurId: process.env.IMGUR_ID,
    imgurSecret: process.env.IMGUR_SECRET
  }
};

export default env;
