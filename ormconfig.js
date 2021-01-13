module.exports = {
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "holodja123",
  database: process.env.DB_NAME || "ga_task",
  synchronize: process.env.DB_SYNCHRONIZE || true,
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
