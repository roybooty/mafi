// @ts-nocheck
import { createUser, loginUser } from "./service.ts";

export const authRouter = {
  "/api/v1/auth/sign-up": {
    POST: async (req) => {
      try {
        const data = await req.json();
        const res = await createUser(data);
        return Response.json(res);
      } catch (error) {
        throw error;
      }
    },
  },

  "/api/v1/auth/sign-in": {
    POST: async (req) => {
      try {
        const data = await req.json();
        const res = await loginUser(data);
        return Response.json(res);
      } catch (error) {
        throw error;
      }
    },
  },
} as const;
