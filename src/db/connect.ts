import { drizzle } from "drizzle-orm/neon-http";
import { DATABASE_URL } from "../config/env.ts";

const db = drizzle(DATABASE_URL!);
if (db) {
    console.log("working");
}

export default db;