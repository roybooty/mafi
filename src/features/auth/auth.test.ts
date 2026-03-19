import { describe, test, expect } from "bun:test";

describe("Authentication testing", () => {
  test("SignUp", async () => {
    const response = await fetch("http://localhost:5500/api/v1/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John Doe",
        email: "test@example.com",
        password: "securePassword123",
      }),
    });

    const data = await response.json();
    expect(response.status).toBe(200);
  });

  test("SignIn", async () => {
    const response = await fetch("http://localhost:5500/api/v1/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "securePassword123",
      }),
    });

    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toHaveProperty("key");
  });

  test("User exist", async () => {
    const response = await fetch("http://localhost:5500/api/v1/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John Doe",
        email: "test@example.com",
        password: "securePassword123",
      }),
    });

    const data = await response.json();
    expect(data.status).toBe(409);
  });

  test("User dosent exist", async () => {
    const response = await fetch("http://localhost:5500/api/v1/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John Doe",
        email: "test@example.com",
        password: "Password123",
      }),
    });

    const data = await response.json();
    expect(data.status).toBe(404);
  });
});
