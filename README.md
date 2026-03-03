# Travlr Getaways — CS 465 Full Stack Development I

Travlr Getaways is a full-stack web application built with Node.js, Express, MongoDB (via Mongoose), and a REST API designed to support both a customer-facing site and an administrative interface.

This repository includes:
- **Customer site (MVC + Handlebars):** server-rendered pages and static assets
- **REST API (`/api`):** JSON endpoints for trip data and authentication
- **Security implementation:** JSON Web Tokens (JWT) protecting administrative endpoints

> Local server runs on port **3000** by default.

---

## Tech Stack

- Backend: Node.js, Express  
- Views: Handlebars (HBS)  
- Database: MongoDB + Mongoose  
- Authentication: JSON Web Tokens (jsonwebtoken)  
- Dev Tooling: nodemon, dotenv  

---

## Run Locally

### 1) Install
```bash
npm install
2) Start (production)
npm start
3) Dev (auto-reload)
npm run dev

Open in browser:

http://localhost:3000
Project Structure

server.js — Express app configuration (middleware, views, routes, API)

app_server/ — MVC structure for customer-facing site

routes/

controllers/

views/

app_api/ — REST API layer

routes/

controllers/

models/

public/ — static assets

API + Security Notes

This server:

Parses JSON request bodies using express.json()

Supports CORS to allow an Angular admin client to communicate with the API

Accepts Authorization headers for JWT validation

Mounts MVC routes at /

Mounts API routes at /api

Serves static files from /public

Module Eight Journal Reflection
Architecture

This project demonstrates two frontend approaches within a single full stack application. The customer-facing site uses Express with Handlebars to render complete HTML pages on the server. This approach is efficient for content-driven pages and traditional navigation.

The administrative side follows a Single Page Application (SPA) model, which relies on REST API endpoints for dynamic CRUD operations. The key architectural difference lies in where rendering occurs: server-side rendering generates full pages before sending them to the client, while SPA rendering occurs in the browser using API-delivered JSON data.

MongoDB was selected because the application data fits naturally into document-based structures. Trip records and user authentication data are stored as flexible JSON-like documents. Mongoose provides schema validation while preserving NoSQL flexibility.

Functionality

JavaScript is the programming language used to implement logic across the frontend and backend. JSON is a lightweight data-interchange format used to transmit structured data between client and server.

JSON ties together the full stack architecture by serving as the consistent format for API communication. The frontend sends JSON request bodies for create and update operations, and the backend responds with JSON for retrieval operations. This consistent data structure aligns cleanly with MongoDB’s document storage model.

Refactoring during development improved maintainability by separating concerns between routes, controllers, and models. Reusable UI components and service layers reduce code duplication, improve consistency, and make future enhancements more efficient.

Testing

API endpoints must be tested based on HTTP method intent:

GET retrieves data

POST creates data

PUT updates data

DELETE removes data

Testing includes verifying correct status codes, correct data structure, and expected behavior when invalid input is provided.

Security testing adds complexity. Protected endpoints must verify the presence of a valid JWT in the Authorization header. Unauthorized or invalid tokens must result in appropriate rejection (e.g., 401 Unauthorized). This ensures that administrative operations remain secure.

Reflection

This course strengthened my ability to design and implement a complete full stack web application. I developed practical experience in REST API design, MongoDB data modeling, server-side rendering, and secure authentication workflows.

Most importantly, I can now confidently explain how frontend and backend systems integrate through APIs, how security layers protect endpoints, and how maintainable architecture supports scalability. These skills directly align with professional full stack development roles and strengthen my portfolio as a marketable candidate.
