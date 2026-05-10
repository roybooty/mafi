import jwt from "jsonwebtoken";
import db from "../db/connect.ts";
import { usersTable } from "../db/schema.ts";
import { JWT_SECRET } from "../config/env.ts";
import { eq } from "drizzle-orm";

const authorize = async (req) => {
  try {
    let token;
    const authHeader = req.headers.get("Authorization");

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return { message: "Not authorized, no token", status: 409 };
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if user still exists
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, decoded.userId));

    if (user.length === 0) {
      return { message: "User no longer exists", status: 401 };
    }

    // Attach user to request object
    req.user = user[0]?.id;
  } catch (error) {
    throw error;
  }
};

export default authorize;
