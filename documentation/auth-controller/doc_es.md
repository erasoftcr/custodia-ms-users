El Controlador de Autenticación (Auth Controller) se encarga de manejar la autenticación de usuarios en la aplicación. Proporciona dos funcionalidades principales: registro de usuarios y inicio de sesión de usuarios.

## Registro

La función `register` se utiliza para crear una nueva cuenta de usuario. Acepta los siguientes parámetros en el cuerpo de la solicitud:

- `username`: El nombre de usuario deseado para la nueva cuenta.
- `email`: La dirección de correo electrónico asociada con la nueva cuenta.
- `password`: La contraseña para la nueva cuenta.
- `userType`: El tipo de cuenta de usuario (por ejemplo, administrador, usuario regular).

La función crea un nuevo usuario en la base de datos utilizando la información proporcionada y devuelve el objeto de usuario recién creado en la respuesta. Si ocurre algún error durante el proceso de registro, se devuelve un mensaje de error con un código de estado de 400.

## Inicio de sesión

La función `login` se utiliza para autenticar a un usuario y generar un JSON Web Token (JWT) para la sesión autenticada. Acepta los siguientes parámetros en el cuerpo de la solicitud:

- `username`: El nombre de usuario del usuario que intenta iniciar sesión.
- `password`: La contraseña del usuario que intenta iniciar sesión.

La función recupera al usuario de la base de datos según el nombre de usuario proporcionado. Si el usuario no se encuentra, se devuelve un mensaje de error. Si se encuentra al usuario, la función compara la contraseña proporcionada con la contraseña hash almacenada en la base de datos. Si las contraseñas coinciden, se genera un JWT utilizando la ID y el nombre de usuario del usuario, y el JWT se devuelve en la respuesta junto con la ID, el nombre de usuario, el correo electrónico y el tipo de usuario del usuario. Si las contraseñas no coinciden, se devuelve un mensaje de error. Si ocurre algún otro error durante el proceso de inicio de sesión, se devuelve un mensaje de error con un código de estado de 202.

## Dependencias

El Controlador de Autenticación depende de las siguientes bibliotecas externas:

- `jsonwebtoken`: Se utiliza para generar y verificar JSON Web Tokens.
- `bcrypt`: Se utiliza para hashear y comparar contraseñas.

El controlador también importa el modelo `User` desde el módulo `../models/userModel.js`.

## Ejemplos de CURL

### Registro

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

En este ejemplo, estamos enviando una solicitud POST al endpoint `/register` con una carga útil JSON que contiene el nombre de usuario, el correo electrónico, la contraseña y el tipo de usuario del nuevo usuario. La bandera `-H` se utiliza para establecer el encabezado `Content-Type` en `application/json`.

### Inicio de sesión

```bash
curl -X POST \
http://localhost:3000/login \
-H 'Content-Type: application/json' \
-d '{
"username": "newuser",
"password": "password123"
}'
```

En este ejemplo, estamos enviando una solicitud POST al endpoint `/login` con una carga útil JSON que contiene el nombre de usuario. En este ejemplo, estamos enviando una solicitud POST al endpoint `/login` con una carga útil JSON que contiene el nombre de usuario y la contraseña del usuario que intenta iniciar sesión. La bandera `-H` se utiliza para establecer el encabezado `Content-Type` en `application/json`.
