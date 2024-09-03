# Custodia User Microservice

This is a Node.js backend project with a microservices architecture for the Custodia app, focusing on user management. It uses ES modules and the latest versions of dependencies.

## Prerequisites

- Node.js (v20 or later)
- PostgreSQL database (set up as per the Dockerfile and docker-compose.yml in the project root)

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up the PostgreSQL database using Docker:
   ```
   docker-compose up -d
   ```
4. Create a `.env` file in the project root (use the provided `.env` file as a template)

## Running the project

To start the development server:

```
npm run dev
```

The server will start on `http://localhost:3000`.

## API Endpoints

- POST /api/users - Create a new user
- GET /api/users/:id - Get a user by ID
- PUT /api/users/:id - Update a user
- DELETE /api/users/:id - Delete a user
- GET /api/users - List users (with pagination)

## Project Structure

- `src/index.js` - Entry point of the application
- `src/config/db.js` - Database configuration
- `src/models/userModel.js` - User model with database operations
- `src/controllers/userController.js` - User-related business logic
- `src/routes/userRoutes.js` - User API routes

## Technologies Used

- Node.js 20
- Express.js 4.18.2
- PostgreSQL (pg 8.11.0)
- bcrypt 5.1.0
- dotenv 16.1.4

## Next Steps

1. Implement authentication and authorization
2. Add input validation
3. Implement error handling middleware
4. Add unit and integration tests
5. Set up CI/CD pipeline
6. Implement additional microservices for other parts of the application (e.g., wallets, transactions)
7. Set up inter-service communication using message queues or gRPC
