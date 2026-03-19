# mafi

# Pure Bun E-Commerce Backend API

**A lightweight, high-performance e-commerce backend built entirely with Bun (no frameworks like Express/Hono/Elysia).**  
Modular monolith with JWT auth, cart management, Stripe payments, and email triggers. Designed for fast iteration, clean architecture, and easy scaling.

[![Bun](https://img.shields.io/badge/Bun-1.x-black?style=flat&logo=bun&logoColor=fff)](https://bun.sh)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[![Node.js Compatibility](https://img.shields.io/badge/Node.js-Compatible-brightgreen)](https://bun.sh)

Current status: **MVP in progress** — Auth complete ✅ | Cart in progress 🚧 | Payments next

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Security & Best Practices](#security--best-practices)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Features

- Secure user authentication (register/login) with JWT & Bun password hashing
- Modular monolith architecture (feature folders: auth, cart, payment, email ,products)
- Persistent shopping cart (DB-backed, user-specific)
- Stripe Payment Intents integration (idempotency, webhooks, success/failure handling)
- Email notifications (order confirmation/receipt) via Nodemailer
- Pure Bun.serve routing (zero framework deps for HTTP layer)
- Type-safe DB access with Drizzle ORM with Postgres
- Custom domain errors & business logic in services
- Cahing with redis
- Arcjet for security
- Testing with Bun
- Image storage with cloudinery

## Tech Stack

- **Runtime**: Bun (fast startup, native SQLite, excellent Node compat)
- **HTTP Server**: Built-in `Bun.serve`
- **Database**: Drizzle ORM + PostgreSQL (prod-ready) + neon
- **Auth**: JWT (jsonwebtoken) + Bun password hashing
- **Payments**: Stripe (Payment Intents + webhooks)
- **Email**: Nodemailer
- **Validation**: Zod
- **caching**: implemented cach with redis
- **Typesefty**: TypeScript for typesefty
- **Testing**: Testing with Bun test
- **Security**: implemented security with Arcjet
- **File Storage**: file storage with cloudinary

## Project Structure

Modular monolith – features grouped by domain for clean separation.

```
src/
├── index.ts # Entry: Bun.serve + route spreading
├── config/ # Env, Stripe init
├── middleware/ # Auth JWT verify, error handler, logger
├── db/ # Drizzle schema, connection, migrations
├── utils/ # Helpers (errors, JWT, etc.)
├── features/
│ ├── auth/ # Register, login, JWT
│ │ ├── routes.ts
│ │ ├── service.ts # Business logic (hash, token gen)
│ │ └── types.ts
│ ├── cart/ # Add/view/update cart items
│ ├── payment/ # Stripe intents, webhooks
│ └── email/ # Send receipts/confirmations
└── types/ # Global types
```

## Getting Started

### Prerequisites

- Bun installed (`curl -fsSL https://bun.sh/install | bash`)

### Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/roybooty/mafi.git

   cd mafi
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Create env file and add keys:

   ```bash
   touch .env.local
   ```

   copy this to env file

   ```
   PORT=yourPortChoice
   DATABASE_URL=yourDbUrl
   JWT_SECRET=yourSecretOfChoice
   ```

4. Run migrations:

   ```bash
   npx drizzle-kit push
   ```

5. Start the backend:
   ```bash
   bun run dev
   ```

### Roadmap

- Auth module (JWT + argon2) &#10004;
- Cart module (add/view/update)
- Products/catalog module
- Stripe PaymentIntents + webhooks
- Email receipts on success
- Guest cart support
- OpenAPI/Swagger docs
- Deployment (Hostinger/Docker)
- Tests (Bun test)
- Rate limiting & caching (Redis)
