import dotenv from "dotenv";
dotenv.config();

import { createPool, Pool } from "mysql2/promise";

class Connect {
  public async connected(): Promise<Pool> {
    const conexion = await createPool({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      connectionLimit: 10,
    });

    if (conexion) console.log("Database Is Connected!");
    else console.log("Database Is Not Connected!");

    return conexion;
  }
}

const dbConnected = new Connect();
export default dbConnected.connected();
