-- Tabla: categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla: usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'user' -- 'admin' o 'user'
);

-- Tabla: peliculas
CREATE TABLE peliculas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    fecha_estreno DATE NOT NULL,
    categoria_id INTEGER NOT NULL REFERENCES categorias(id)
);

-- Tabla: peliculas_vistas
CREATE TABLE peliculas_vistas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    pelicula_id INTEGER NOT NULL REFERENCES peliculas(id),
    fecha_vista DATE NOT NULL DEFAULT CURRENT_DATE
);

ALTER TABLE peliculas_vistas
ADD CONSTRAINT unique_usuario_pelicula UNIQUE (usuario_id, pelicula_id);


-- Precargar categorías
INSERT INTO categorias (nombre) VALUES
('Terror'), ('Suspenso'), ('Drama'), ('Comedia');
