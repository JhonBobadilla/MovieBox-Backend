EndPoints => URL => JSON e instrucciones para probar todos los endpoints en postman.

1) POST/api/users => crear usuario => http://localhost:3000/api/users
{
  "name": "Carlos",
  "email": "correo1@correo.com",
  "password": "123",
  "role": "admin" // Roles disponibles "admin" y "user"
}

2) POST/api/peliculas => crear pelicula => http://localhost:3000/api/peliculas
{
  "titulo": "El Conjuro",
  "fecha_estreno": "2023-06-01",
  "categoria_id": 1 // 1=Terror, 2=Suspenso, 3=Drama y 4=Comedia.
}

3) GET/api/peliculas => listar peliculas => http://localhost:3000/api/peliculas

Para probar en postman en "params" puedes emplear uno o varios filtros:
por defecto (sin filtro) mostrará 10 peliculas que corresponden a la pagina 1.

Key disponible: 

titulo: Filtra por el texto en el nombre de la película.
categoria: Filtra por el nombre de la categoría de la película (Terror, Suspenso, Drama y Comedia).
page: Número de página para paginación (ejemplo: 1, 2, ...).
limit: Cantidad máxima de películas por página (ejemplo: 10, 20, ...).
order: Orden de la fecha de estreno (asc para más antiguas primero, desc para más nuevas primero).

Ejemplo de uso en Postman: sección params llenar los campos.

Key          Value
titulo	     bella

Key          Value
categoria	 Drama

Key          Value
page	     2

Key          Value
limit	     5

Key          Value
order	     desc
