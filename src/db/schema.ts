import {
  integer,
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  decimal,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: varchar("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const productsTable = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stockQuantity: integer("stock_quantity").default(0),
  imageUrl: varchar("image_url", { length: 255 }),
});

export const cartsTable = pgTable("carts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => usersTable.id),
  status: varchar("status", { length: 20 }).default("active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cartItemsTable = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  cartId: uuid("cart_id")
    .references(() => cartsTable.id)
    .notNull(),
  productId: uuid("product_id")
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer("quantity").notNull().default(1),
  priceAtAddition: decimal("price_at_addition", {
    precision: 10,
    scale: 2,
  }).notNull(),
});
