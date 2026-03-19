import db from "../../db/connect.ts";
import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schema.ts";
import type { User } from "./types.ts";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.ts";

// Logic to create user
export const createUser = async (data: User) => {
  try {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, data.email));
    if (existingUser.length > 0) {
      return { message: "User already exist", status: 200 };
    }

    const hashedPassword = await argon2.hash(data.password);
    data.password = hashedPassword;

    const newUser = await db
      .insert(usersTable)
      .values(data)
      .returning({ insertedId: usersTable.id });

    if (newUser) {
      const token = await jwt.sign(
        { userId: newUser[0]?.insertedId },
        JWT_SECRET,
        {
          expiresIn: "5d",
        },
      );
      return { message: "User created successfully", status: 201, key: token };
    }
  } catch (error) {
    throw error;
  }
};

// Logic to add in user
export const loginUser = async (data: User) => {
  try {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, data.email));
    if (existingUser.length <= 0) {
      return { message: "User or Password is incorrect", status: 404 };
    }

    const verifyPassword = await argon2.verify(
      existingUser[0].password,
      data.password,
    );
    if (!verifyPassword) {
      return { message: "User or Password is incorrect", status: 404 };
    }

    const token = await jwt.sign({ userId: existingUser[0]?.id }, JWT_SECRET, {
      expiresIn: "5d",
      algorithm: "RS256",
    });
    return { message: "User created successfully", status: 201, key: token };
  } catch (error) {
    throw error;
  }
};
