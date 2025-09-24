import mysql from "mysql2/promise";
import fs from 'fs'
import path from 'path'
let pool;

if (!globalThis.mysqlPool) {
  globalThis.mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,   
  database: process.env.DB_NAME,
      port: 20568, 
    ssl: {ca: fs.readFileSync(path.join(process.cwd(), 'src/app/lib/ca.pem'))},
        waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

pool = globalThis.mysqlPool;

export function getDB() {
    return pool;
}
