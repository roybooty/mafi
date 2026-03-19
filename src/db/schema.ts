import { integer, pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid().primaryKey(),
    name: varchar("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull()
});
