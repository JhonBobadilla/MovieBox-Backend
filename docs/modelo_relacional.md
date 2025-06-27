### Tabla: categorias
- id (PK)
- nombre (UNIQUE)
- descripcion
- created_at
- updated_at

### Tabla: usuarios
- id (PK)
- nombre
- email (UNIQUE)
- password
- rol // admin | user
- status // activo, inactivo, bloqueado
- created_at
- updated_at

### Tabla: peliculas
- id (PK)
- titulo
- descripcion
- director
- fecha_estreno
- duracion
- categoria_id (FK a categorias.id)
- imagen_url
- estado // estrenada, próxima, eliminada
- created_at
- updated_at

### Tabla: peliculas_vistas
- usuario_id (FK a usuarios.id)
- pelicula_id (FK a peliculas.id)
- fecha_vista
- rating_usuario
- review
- PRIMARY KEY (usuario_id, pelicula_id)

