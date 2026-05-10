import { eq } from "drizzle-orm";
import db from "../../db/connect.ts";
import { cartItemsTable, cartsTable } from "../../db/schema";

export const getCart = async (data: String) => {
  try {
    const getCart = await db
      .select({ dirId: cartsTable.id })
      .from(cartsTable)
      .where(eq(cartsTable.userId, data));
    const getCartItem = await db
      .select()
      .from(cartItemsTable)
      .where(eq(cartItemsTable.cartId, dirId));

    return { message: "fetched successfully", data: getCartItem, status: 200 };
  } catch (error) {
    throw error;
  }
};
