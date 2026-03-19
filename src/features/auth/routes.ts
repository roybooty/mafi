export const authRouter = {
  "/api/v1/auth/sign-up": {
    GET: async req => {
      return Response.json({ "message": "this is a sign up" });
    }
  },

  "/api/v1/auth/sign-in/:id": {
    GET: async req => {
      return Response.json(`this is a sign in ${req.params.id}`);
    }
  }
} as const
