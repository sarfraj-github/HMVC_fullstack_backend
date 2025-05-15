module.exports = {
  dbConfig: {
    HOST: process.env.HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DATABASE_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
  },
  jwt: {
    JWT_SECRET: "AJ$^&M$ER@101", // used for sign JWT tokens
    JWT_EXPIRE_IN: "5h", // tkoen validity period
  },
};
