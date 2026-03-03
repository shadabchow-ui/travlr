# Travlr Getaways — CS 465 Full Stack Development I

Travlr Getaways is a full-stack web application built with Node.js + Express, MongoDB (via Mongoose), and a REST API designed to support a customer-facing site and an administrative interface.

This repository includes:
- **Customer site (MVC + Handlebars):** server-rendered pages and static assets
- **REST API (`/api`):** JSON endpoints for trip data and authentication
- **Security foundation:** JSON Web Tokens (JWT) and Authorization headers (used for protected routes)

> Local server runs on port **3000** by default.

---

## Tech Stack

- **Backend:** Node.js, Express
- **Views:** Handlebars (HBS)
- **Database:** MongoDB + Mongoose
- **Auth/Security:** JSON Web Tokens (jsonwebtoken)
- **Dev tooling:** nodemon, dotenv

Dependencies match this repo’s `package.json`.  

---

## Run Locally

### 1) Install
```bash
npm install
2) Start (production-style)
npm start
3) Dev (auto-reload)
npm run dev

Open:

http://localhost:3000

Project Structure (High Level)

server.js — Express app setup (middleware, views, routes, API)

app_server/ — MVC for customer-facing pages

routes/ — route definitions

controllers/ — controller logic

views/ — Handlebars templates + partials

data/ — JSON used during earlier iterations (ex: trips.json)

app_api/ — REST API layer

routes/ — API routing

models/ — Mongoose models + DB connection

public/ — static assets (CSS/images)

API + Security Notes (What the Code Does)

This server is configured to:

Parse JSON request bodies (express.json())

Allow CORS requests broadly (useful for an Angular admin SPA running on another port such as :4200)

Allow Authorization headers for JWT testing in Postman/browser clients

Mount MVC routes at / and API routes at /api

Serve static assets from public/
