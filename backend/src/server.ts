import cors from "cors";
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import dotenv from "dotenv";
import express from "express";
import sql from "mssql";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(cors());
app.use(express.json());

let pool: sql.ConnectionPool | undefined;

const hashPassword = (password: string, salt: string) =>
  scryptSync(password, salt, 64).toString("hex");

async function initializeDatabase() {
  const masterPool = await sql.connect(bootstrapConfig);
  await masterPool.request().query(`
    IF DB_ID(N'${dbConfig.database}') IS NULL
      CREATE DATABASE [${dbConfig.database}]
  `);
  await masterPool.request().query(`
    IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = N'admin')
      CREATE LOGIN [admin] WITH PASSWORD = '123', CHECK_POLICY = OFF, CHECK_EXPIRATION = OFF
    ELSE
      ALTER LOGIN [admin] WITH PASSWORD = '123', CHECK_POLICY = OFF, CHECK_EXPIRATION = OFF
    ALTER LOGIN [admin] WITH DEFAULT_DATABASE = [${dbConfig.database}]
  `);
  await masterPool.close();

  const databaseBootstrapPool = await sql.connect({ ...bootstrapConfig, database: dbConfig.database });
  await databaseBootstrapPool.request().query(`
    IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = N'admin')
    BEGIN
      CREATE USER [admin] FOR LOGIN [admin];
      ALTER ROLE db_owner ADD MEMBER [admin];
    END
  `);
  await databaseBootstrapPool.close();

  pool = await sql.connect(dbConfig);
  await pool.request().query(`
    IF OBJECT_ID(N'dbo.Users', N'U') IS NULL
    BEGIN
      CREATE TABLE dbo.Users (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(120) NOT NULL,
        Email NVARCHAR(255) NOT NULL UNIQUE,
        PasswordHash VARCHAR(128) NOT NULL,
        PasswordSalt VARCHAR(64) NOT NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
      )
    END
  `);
}

function getPool() {
  if (!pool) throw new Error("La base de datos todavía no está disponible");
  return pool;
}

app.post("/auth/register", async (request, response) => {
  const { name, email, password } = request.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    response.status(400).json({ message: "Nombre, email y contraseña son obligatorios" });
    return;
  }

  try {
    const passwordSalt = randomBytes(32).toString("hex");
    const passwordHash = hashPassword(password, passwordSalt);
    await getPool()
      .request()
      .input("name", sql.NVarChar(120), name)
      .input("email", sql.NVarChar(255), email)
      .input("passwordHash", sql.VarChar(128), passwordHash)
      .input("passwordSalt", sql.VarChar(64), passwordSalt)
      .query(`
        INSERT INTO dbo.Users (Name, Email, PasswordHash, PasswordSalt)
        VALUES (@name, @email, @passwordHash, @passwordSalt)
      `);
    response.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    if (error instanceof Error && error.message.includes("UNIQUE")) {
      response.status(409).json({ message: "El email ya está registrado" });
      return;
    }
    console.error("Registration failed:", error);
    response.status(503).json({ message: "La base de datos no está disponible" });
  }
});

app.post("/auth/login", async (request, response) => {
  const { email, password } = request.body as { email?: string; password?: string };
  try {
    const result = await getPool()
      .request()
      .input("email", sql.NVarChar(255), email ?? "")
      .query("SELECT TOP 1 Name, Email, PasswordHash, PasswordSalt FROM dbo.Users WHERE Email = @email");
    const user = result.recordset[0];
    const passwordHash = user ? hashPassword(password ?? "", user.PasswordSalt) : "";
    const validPassword = user && timingSafeEqual(Buffer.from(passwordHash), Buffer.from(user.PasswordHash));

    if (!validPassword) {
      response.status(401).json({ message: "Email o contraseña inválidos" });
      return;
    }

    response.json({ token: randomUUID(), user: { name: user.Name, email: user.Email } });
  } catch (error) {
    console.error("Login failed:", error);
    response.status(503).json({ message: "La base de datos no está disponible" });
  }
});

const dbConfig: sql.config = {
  server: process.env.DB_SERVER ?? "localhost",
  port: Number(process.env.DB_PORT ?? 1433),
  database: process.env.DB_NAME ?? "GalloDb",
  user: process.env.DB_USER ?? "sa",
  password: process.env.DB_PASSWORD ?? "GalloPassword_2026!",
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: true,
  },
};

const bootstrapConfig: sql.config = {
  ...dbConfig,
  database: "master",
  user: process.env.DB_BOOTSTRAP_USER ?? "sa",
  password: process.env.DB_BOOTSTRAP_PASSWORD ?? "GalloPassword_2026!",
};

app.get("/health", async (_request, response) => {
  try {
    const result = await getPool().request().query("SELECT DB_NAME() AS databaseName");
    response.json({
      status: "ok",
      database: result.recordset[0]?.databaseName ?? dbConfig.database,
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    response.status(503).json({ status: "error", database: "unavailable" });
  }
});

app.get("/", (_request, response) => {
  response.json({ name: "Proyecto Prueba Login Gallo API", status: "ok" });
});

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`);
      console.log(`Database connected: ${dbConfig.database}`);
    });
  })
  .catch((error) => {
    console.error("Database initialization failed:", error);
    app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
  });
