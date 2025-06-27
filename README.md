EndPoints => URL => JSON e instrucciones para probar todos los endpoints en postman.

1) POST/api/users => crear usuario => http://localhost:3000/api/users

Se debe crear con el siguiente JSON:

{
  "name": "Carlos",
  "email": "correo1@correo.com",
  "password": "123",
  "role": "admin" // Roles disponibles "admin" y "user"
}

Una vez creado el usuario se vera el mensaje "201 Created"

2) POST/api/peliculas => crear pelicula => http://localhost:3000/api/peliculas

Se debe crear UNICAMENTE CON ID DE "admin" NO CREA CON ID DE "user" con el siguiente JSON:

{
  "titulo": "El Conjuro",
  "fecha_estreno": "2023-06-01",
  "categoria_id": 1 // 1=Terror, 2=Suspenso, 3=Drama y 4=Comedia.
  "usuario_id": 15 // solo crea con id de admin, (ver tabla usuarios columna rol).
}

Una vez creada la pelicula se vera el mensaje "201 Created"

3) GET/api/peliculas => listar peliculas => http://localhost:3000/api/peliculas

Prueba en postman: 
En la sección "params" se puede emplear uno o varios filtros:
por defecto (sin filtro) mostrará 10 peliculas que corresponden a la pagina 1.

Key disponible: 

titulo: Filtra por el texto en el nombre de la película.
categoria: Filtra por el nombre de la categoría de la película (Terror, Suspenso, Drama y Comedia).
page: Número de página para paginación (ejemplo: 1, 2, 3...).
limit: Cantidad máxima de películas por página (ejemplo: 10, 20, ...).
order: Orden de la fecha de estreno (asc para más antiguas primero, desc para más nuevas primero).

Ejemplo de aplicación de filtros en Postman: sección "params" llenar los campos.

Key          Value
titulo	     bella

Key          Value
categoria	   Drama

Key          Value
page	       2

Key          Value
limit	       5

Key          Value
order	       desc

4) GET/api/peliculas => listar peliculas "novedades"=> http://localhost:3000/api/peliculas/novedades

   Cuando se listen las peliculas se verá el mensaje "200 ok"


5) POST/api/peliculas => marcar peliculas como vistas=> http://localhost:3000/api/peliculas/vista
   
   Este endpoint marca las peliculas como vistas UNICAMENTE en un rol de usuario "user"

   JSON para enviar la petición:

{
  "usuario_id": 5, // solo crea con id de user, (ver tabla usuarios columna rol).
  "pelicula_id": 7
} 

   cuando la respuesta sea exitosa saldrá el mensaje "201 Created" 

6) GET/api/peliculas-vistas => listar usuarios con las peliculas que han visto "peliculas-vistas"=> http://localhost:3000/api/peliculas-vistas   

Cuando se listen los usuarios se verá el mensaje "200 ok"