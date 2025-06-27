EndPoints => URL => Body para probar en JSON  

POST/api/users => crear usuario => http://localhost:3000/api/users
{
  "name": "Carlos",
  "email": "correo1@correo.com",
  "password": "123",
  "role": "admin"
}

POST/api/peliculas => crear pelicula => http://localhost:3000/api/peliculas
{
  "titulo": "El Conjuro",
  "fecha_estreno": "2023-06-01",
  "categoria_id": 1
}