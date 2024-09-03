# Auth Controller Documentation

The Auth Controller is responsible for handling user authentication in the application. It provides two main functionalities: user registration and user login.

## Register

The `register` function is used to create a new user account. It accepts the following parameters in the request body:

- `username`: The desired username for the new account.
- `email`: The email address associated with the new account.
- `password`: The password for the new account.
- `userType`: The type of user account (e.g., admin, regular user).

The function creates a new user in the database using the provided information and returns the newly created user object in the response. If any error occurs during the registration process, an error message is returned with a status code of 400.

## Login

The `login` function is used to authenticate a user and generate a JSON Web Token (JWT) for the authenticated session. It accepts the following parameters in the request body:

- `username`: The username of the user attempting to log in.
- `password`: The password of the user attempting to log in.

The function retrieves the user from the database based on the provided username. If the user is not found, an error message is returned. If the user is found, the function compares the provided password with the hashed password stored in the database. If the passwords match, a JWT is generated using the user's ID and username, and the JWT is returned in the response along with the user's ID, username, email, and user type. If the passwords do not match, an error message is returned. If any other error occurs during the login process, an error message is returned with a status code of 202.

## Dependencies

The Auth Controller depends on the following external libraries:

- `jsonwebtoken`: Used to generate and verify JSON Web Tokens.
- `bcrypt`: Used to hash and compare passwords.

The controller also imports the `User` model from the `../models/userModel.js` module.

##

## CURL Examples

### Register

```bash
curl -X POST \
  http://localhost:3000/register \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "password123",
    "userType": "regular"
  }'
```

In this example, we're sending a POST request to the `/register` endpoint with a JSON payload containing the new user's username, email, password, and user type. The `-H` flag is used to set the `Content-Type` header to `application/json`.

### Login

```bash
curl -X POST \
  http://localhost:3000/login \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "newuser",
    "password": "password123"
  }'
```

In this example, we're sending a POST request to the `/login` endpoint with a JSON payload containing the username and password of the user attempting to log in. The `-H` flag is used to set the `Content-Type` header to `application/json`.
