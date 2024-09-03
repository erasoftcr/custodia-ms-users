# User Controller Documentation

This module contains the controller functions for handling user-related operations in your application. The controller functions are designed to interact with the user model to perform CRUD operations.

## Functions

### `createUser(req, res)`

This function is used to create a new user. It expects the following properties in the request body: `username`, `email`, `password`, and `userType`.

Example cURL command:

```
curl -X POST -H "Content-Type: application/json" -d '{"username": "newuser", "email": "newuser@example.com", "password": "password123", "userType": "admin"}' http://localhost:3000/users
```

### `getUser(req, res)`

This function is used to retrieve a user by their ID. It expects the user ID as a parameter in the request URL.

Example cURL command:

```
curl -X GET http://localhost:3000/users/123
```

### `updateUser(req, res)`

This function is used to update an existing user. It expects the user ID as a parameter in the request URL and the updated user data in the request body.

Example cURL command:

```
curl -X PUT -H "Content-Type: application/json" -d '{"username": "updateduser", "email": "updateduser@example.com"}' http://localhost:3000/users/123
```

### `deleteUser(req, res)`

This function is used to delete a user. It expects the user ID as a parameter in the request URL.

Example cURL command:

```
curl -X DELETE http://localhost:3000/users/123
```

### `listUsers(req, res)`

This function is used to retrieve a list of users. It supports pagination using the `limit` and `offset` query parameters.

Example cURL command:

```
curl -X GET http://localhost:3000/users?limit=20&offset=0
```

In this example, the `limit` parameter is set to 20, which means that the server will return a maximum of 20 users. The `offset` parameter is set to 0, which means that the server will start returning users from the beginning of the list.
