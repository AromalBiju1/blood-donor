import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
let pool;

if (!globalThis.mysqlPool) {
  // Path to your CA file
  const caPath = path.join(process.cwd(), "src/lib/ca.pem");

  // Check if CA file exists
  const sslOptions = fs.existsSync(caPath)
    ? { ca: fs.readFileSync(caPath) }
    : undefined; // if not exists, skip SSL
    

  globalThis.mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 20568,
    ssl: sslOptions,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

pool = globalThis.mysqlPool;

export function getDB() {
  return pool;
}
