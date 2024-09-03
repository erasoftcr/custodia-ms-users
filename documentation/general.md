# User Microservice Documentation

## Overview

The User Microservice is responsible for managing user-related operations in the Custodia application. It provides functionality for user registration, authentication, and CRUD operations on user accounts.

## Architecture

The microservice follows a typical Express.js application structure:

- `src/`
  - `config/`: Configuration files (e.g., database connection)
  - `controllers/`: Request handlers
  - `middleware/`: Custom middleware functions
  - `models/`: Data models and database interactions
  - `routes/`: API route definitions
  - `services/`: Business logic (if any)
  - `index.js`: Main application file

## Main Components

### 1. Server Configuration (index.js)

The main server file sets up the Express application, connects to the database, configures middleware, and defines error handling.

Key features:
- Uses environment variables for configuration
- Connects to the database
- Sets up JSON parsing middleware
- Defines API routes
- Implements error handling middleware
- Listens on the specified port

### 2. Routes (userRoutes.js)

The `userRoutes.js` file defines the API endpoints for user-related operations.

#### Public Routes:
- `POST /api/users/register`: User registration
- `POST /api/users/login`: User login

#### Protected Routes (require authentication):
- `POST /api/users`: Create a new user
- `GET /api/users/:id`: Get user details
- `PUT /api/users/:id`: Update user information
- `DELETE /api/users/:id`: Delete a user
- `GET /api/users`: List users (with pagination)

### 3. Controllers

#### userController.js

Handles user CRUD operations:

- `createUser`: Create a new user
- `getUser`: Retrieve user details
- `updateUser`: Update user information
- `deleteUser`: Delete a user
- `listUsers`: List users with pagination

#### authController.js

Handles authentication-related operations:

- `register`: User registration
- `login`: User login

### 4. Models (userModel.js)

Defines the user data model and database interactions. It likely includes methods for:

- Creating users
- Finding users by ID
- Updating user information
- Removing users
- Listing users

### 5. Middleware (auth.js)

Contains authentication middleware:

- `authenticateToken`: Verifies the JWT token for protected routes

## API Endpoints

### Public Endpoints

1. **Register User**
   - URL: `/api/users/register`
   - Method: `POST`
   - Description: Register a new user

2. **Login User**
   - URL: `/api/users/login`
   - Method: `POST`
   - Description: Authenticate a user and return a JWT token

### Protected Endpoints (require authentication)

3. **Create User**
   - URL: `/api/users`
   - Method: `POST`
   - Description: Create a new user (admin operation)

4. **Get User**
   - URL: `/api/users/:id`
   - Method: `GET`
   - Description: Retrieve user details by ID

5. **Update User**
   - URL: `/api/users/:id`
   - Method: `PUT`
   - Description: Update user information

6. **Delete User**
   - URL: `/api/users/:id`
   - Method: `DELETE`
   - Description: Delete a user

7. **List Users**
   - URL: `/api/users`
   - Method: `GET`
   - Description: List users with pagination
   - Query Parameters:
     - `limit`: Number of users per page (default: 10)
     - `offset`: Number of users to skip (default: 0)

## Error Handling

The microservice implements centralized error handling middleware to catch and respond to errors consistently. Specific error messages are returned for various scenarios, such as invalid input, authentication failures, or resource not found.

## Security

- JWT (JSON Web Tokens) are used for authentication
- Protected routes require a valid JWT token
- Passwords are likely hashed before storing in the database (implementation in userModel.js)

## Database

The microservice connects to a database (likely PostgreSQL) using the configuration in `config/db.js`. The exact database schema is not provided in the given files but can be inferred from the user operations.

## Environment Variables

The application uses environment variables for configuration. Make sure to set up the following variables:

- `PORT`: The port on which the server will run (default: 3000)
- Database connection details (likely includes `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`)
- JWT secret key for token signing and verification

## Running the Microservice

1. Ensure all dependencies are installed: `npm install`
2. Set up the required environment variables
3. Start the server: `npm start` (assuming the start script is defined in package.json)

The server will start, connect to the database, and listen for incoming requests on the specified port.