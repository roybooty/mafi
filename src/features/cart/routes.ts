import authorize from "../../middleware/auth.middleware.ts";
import { getCart } from "./service.ts";

export const cartRouter = {
  "/api/v1/cart/get-cart": {
    GET: async (req) => {
      try {
        let data;
        const val = await authorize(req);
        if (val) {
          return Response.json(val);
        }
        data = getCart(req.user);
        return Response.json(data);
      } catch (error) {
        throw error;
      }
    },
  },
} as const;
