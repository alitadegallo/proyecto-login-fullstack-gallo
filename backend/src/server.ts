import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import sql from "mssql";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(cors());
app.use(express.json());

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

app.get("/health", async (_request, response) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT DB_NAME() AS databaseName");
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

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
