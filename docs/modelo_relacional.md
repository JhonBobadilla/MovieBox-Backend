## Modelo relacional de la base de datos

### Tabla: categorias
- id (PK)
- nombre

### Tabla: usuarios
- id (PK)
- nombre
- email
- password
- rol // admin | user

### Tabla: peliculas
- id (PK)
- titulo
- fecha_estreno
- categoria_id (FK a categorias.id)

### Tabla: peliculas_vistas
- id (PK)
- usuario_id (FK a usuarios.id)
- pelicula_id (FK a peliculas.id)
- fecha_vista
