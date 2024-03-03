import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index";

const connectionString = process.env.DATABASE_URL as string;
const client = postgres(connectionString, {
  prepare: false,
  connect_timeout: 30,
});
const db = drizzle(client, { schema });

export default db;
