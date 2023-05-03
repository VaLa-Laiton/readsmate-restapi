# READSMATE-RestAPI

Esta es una RestAPI para un proyecto personal.

## Requisitos

Antes de comenzar a utilizar esta RestAPI, asegúrate de tener instalados los siguientes programas:

- Node.js
- MySQL
- Un cliente HTTP, como Insomnia o Postman.

## Instalación y configuración

1.  Clona este repositorio.
2.  En una consola, accede a la carpeta del repositorio clonado e instala los módulos con el comando `npm install`.
3.  En la carpeta `db`, sigue las instrucciones que se encuentran en el archivo `readsmate-db.sql` para crear la base de datos.
4.  Abre tu cliente HTTP y comienza a realizar consultas a la API.

## EndPoints de la API

### Usuarios

- Registro de usuario: POST -> localhost:3000/api/user/sign-up. El servidor espera los siguientes datos en formato JSON: nickname, email y password.
- Inicio de sesión: POST -> localhost:3000/api/user/log-in. El servidor espera los siguientes datos en formato JSON: email y password.
- Para realizar consultas GET a usuarios, debes ser un usuario con rol de administrador. Para obtener este rol, agrega la propiedad `"role": "admin"` después de `"password"` cuando te registres.
- Las consultas GET, PATCH y DELETE que requieren un `id` se hacen a través de localhost:3000/api/user/:userId. Ingresa el `id` del usuario que deseas buscar, actualizar o eliminar. Recuerda que para actualizar a un usuario, basta con ingresar la clave y el valor a actualizar.
- Solo el propio usuario puede actualizar sus datos. Para esto, el usuario debe ingresar el token que le proporciona la API después de registrarse o iniciar sesión. Para eliminar un usuario, un usuario administrador puede eliminar a cualquier otro usuario.

### Artículos

- Para crear un nuevo artículo, realiza una petición POST a través de localhost:3000/api/article. El servidor espera un objeto JSON con los siguientes valores: `title` y `urlFile`. `title` es el título del artículo y `urlFile` es la URL donde se almacenará el documento markdown que contiene el texto del artículo.
- Las consultas GET a la API son públicas y cualquiera puede ver todos los artículos almacenados en la base de datos, incluso si no está registrado ni ha iniciado sesión. Esto se puede hacer a través del siguiente EndPoint: localhost:3000/api/article.
- Las consultas PATCH y DELETE requieren que el usuario esté registrado e inicie sesión, y se realizan a través de localhost:3000/api/article/:articleId. Al igual que en Users, para actualizar se requiere al creador del artículo, pero para eliminar un artículo, un usuario administrador también puede hacerlo.

### Comentarios

- Para manejar las peticiones a los comentarios, se utiliza el mismo proceso que para los artículos, solo cambia el EndPoint a localhost:3000/api/comment y localhost:3000/api/comment/commentId. Para crear comentarios, el servidor espera un objeto JSON con los valores `articleId` y `content`. `articleId` hace referencia al artículo donde se realiza el comentario y `content` al contenido del comentario. Al igual que en los artículos, solo el propio usuario puede actualizar sus datos y un usuario administrador puede eliminar cualquier comentario.
