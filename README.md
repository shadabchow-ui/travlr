[CS465_README_Module8.md](https://github.com/user-attachments/files/25724038/CS465_README_Module8.md)
# Travlr Getaways — CS 465 Full Stack Development I

Travlr Getaways is a full-stack web application built with Node.js, Express, MongoDB (via Mongoose), and a REST API designed to support both a customer-facing site and an administrative interface.

This repository includes:
- **Customer site (MVC + Handlebars):** server-rendered pages and static assets
- **Admin interface (SPA):** Angular-based administrative UI (in `app_admin/`) that consumes the REST API
- **REST API (`/api`):** JSON endpoints for trip data and authentication
- **Security implementation:** JSON Web Tokens (JWT) protecting administrative endpoints

> Local server runs on port **3000** by default (unless configured otherwise).

---

## Tech Stack

- **Backend:** Node.js, Express  
- **Views (customer site):** Handlebars (HBS)  
- **Database:** MongoDB + Mongoose  
- **Admin UI:** Angular (SPA)  
- **Authentication:** JSON Web Tokens (jsonwebtoken)  
- **Dev tooling:** nodemon, dotenv  

---

## Run Locally

### 1) Install (root server)
```bash
npm install
```

### 2) Start (production-style)
```bash
npm start
```

### 3) Dev (auto-reload)
```bash
npm run dev
```

Open in browser:
- http://localhost:3000

---

## Admin App (Angular SPA)

The admin interface is located in `app_admin/`.

From the project root:
```bash
cd app_admin
npm install
npm start
```

If your admin app is configured to proxy API requests, it will forward calls to the Express backend (commonly `http://localhost:3000/api`). If not, update the Angular environment/proxy settings accordingly.

---

## Project Structure (High Level)

- `server.js` — Express app setup (middleware, views, routes, API)
- `app_server/` — MVC structure for customer-facing pages  
  - `routes/` — route definitions  
  - `controllers/` — controller logic  
  - `views/` — Handlebars templates + partials  
  - `data/` — JSON used during earlier iterations (example: `trips.json`)  
- `app_api/` — REST API layer  
  - `routes/` — API routing  
  - `controllers/` — controller logic  
  - `models/` — Mongoose models + DB connection  
  - `config/` — authentication helpers/config  
- `app_admin/` — Angular administrative SPA (login + trip management)
- `public/` — static assets (CSS/images)

---

## API + Security Notes

This server is configured to:
- Parse JSON request bodies using `express.json()`
- Support CORS for cross-origin requests (useful when the Angular admin runs on a different port)
- Accept `Authorization` headers for JWT validation
- Mount MVC routes at `/`
- Mount API routes at `/api`
- Serve static assets from `public/`

---

# Module Eight Journal Reflection

## Architecture

### Compare and contrast the frontend development approaches used
This project uses multiple frontend approaches to serve different user needs:

- **Express + Handlebars (server-rendered HTML)** for the customer-facing experience. Pages are assembled on the server and delivered as complete HTML responses. This works well for content-first browsing and traditional navigation, and it reduces complexity for users who do not need an authenticated workflow.

- **JavaScript (client-side enhancements)** can be used on the customer side to improve usability (small interactions and behavior), without requiring a full SPA architecture. In this model, JavaScript complements server-rendered pages rather than replacing them.

- **Single Page Application (Angular admin UI)** for the administrative experience. The SPA loads once, handles routing in the browser, and relies on REST API calls for CRUD operations. This is a good fit for a data-management interface that needs quick updates, forms, and repeated editing workflows without full page reloads.

The main difference is where rendering and navigation are handled: server-side for Express/Handlebars versus client-side for the SPA. Using both in one project demonstrates how different frontend patterns can coexist while sharing the same backend API.

### Why the backend used a NoSQL MongoDB database
MongoDB fits this application because the core records (trips and user/auth data) map naturally to JSON-like documents. The document model supports iterative development where fields can evolve over time. Mongoose provides structure and validation at the application layer, which keeps development flexible while still enforcing consistent data rules for the API and UI.

---

## Functionality

### How JSON differs from JavaScript and how JSON ties the frontend and backend together
**JavaScript** is a programming language used to implement application logic (controllers, services, UI behavior).  
**JSON** is a data-interchange format used to represent structured data.

JSON looks similar to JavaScript object notation, but JSON is purely data—no functions or executable logic. In this project, JSON is the “shared language” between the client and server:
- The admin SPA sends JSON request bodies to create or update trips.
- The backend returns JSON responses for list/detail retrieval.
- The data stored in MongoDB documents translates cleanly into JSON for API responses.

This consistent format keeps the full stack aligned, making it easier to validate data contracts between frontend and backend.

### Refactoring instances and benefits of reusable UI components
During full stack development, refactoring improves maintainability and efficiency by reducing duplication and improving separation of concerns. Common refactoring patterns in a project like this include:
- Moving repeated route logic into controllers so routing stays clean and responsibilities are clear
- Centralizing database access and validation in models instead of scattering it across routes
- On the admin side, consolidating API calls into services (for example, a trip data service) so components remain focused on UI behavior

Reusable UI components provide clear benefits:
- **Consistency:** shared components enforce consistent patterns and styling
- **Efficiency:** building new screens is faster when components can be reused
- **Maintainability:** updates happen once and apply everywhere the component is used
- **Testability:** smaller components are easier to verify and debug

---

## Testing

### Methods, endpoints, and security in a full stack application
A REST API uses HTTP methods to communicate intent:
- **GET** retrieves data
- **POST** creates data
- **PUT** updates data
- **DELETE** removes data

Testing should validate:
- Correct status codes (200/201 for success, 400 for validation errors, 404 for missing resources, etc.)
- Correct response shapes (fields, types, and required properties)
- Correct behavior for edge cases (missing input, invalid IDs, empty results)

Security increases testing complexity because protected endpoints must behave correctly in both scenarios:
1) **Authorized requests** (valid JWT present in `Authorization: Bearer <token>`)
2) **Unauthorized requests** (missing/invalid/expired token rejected, typically with 401)

This requires testing not only the endpoint functionality, but also the authentication flow (login → token issuance → token usage) and verifying that admin-only actions cannot be performed without a valid token.

---

## Reflection

### How this course helped me reach professional goals and build marketable skills
This course strengthened my ability to build and explain an end-to-end full stack web application. I improved my skills in:
- Designing RESTful endpoints that support multiple frontends
- Building server-rendered customer pages and an API-driven admin workflow
- Modeling data with MongoDB and enforcing validation through Mongoose
- Implementing JWT-based authentication and protecting administrative actions
- Organizing code into maintainable layers (routes, controllers, models, and UI services)

Most importantly, this project is portfolio-ready because it demonstrates a full development workflow: backend + database + frontend + security working together as a complete system.
