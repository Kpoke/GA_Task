module.exports = {
  type: "mysql",
<<<<<<< HEAD
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "holodja123",
  database: process.env.DB_NAME || "ga_task",
  synchronize: process.env.DB_SYNCHRONIZE || true,
=======
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "ga_task",
  synchronize: process.env.DB_SYNCHRONIZE,
>>>>>>> 214b31d72f0d579d35b0e1e4e001ff1fba7a2c99
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
