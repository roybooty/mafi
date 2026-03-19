import { PORT } from "./config/env.ts"
import { authRouter } from "./features/auth/routes.ts";

const allRoutes = {
  ...authRouter,
  "/": new Response("welcome to mafi")
};

const server = Bun.serve({
  port: PORT || 3000,
  routes: allRoutes,

  fetch(req) {
    return new Response("404 not found", { status: 404 })
  },

  error(error) {
    console.log(error);
  },
})

console.log(`Backend listening at ${server.url}`);
