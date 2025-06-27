-- Elimina tablas si existen
DROP TABLE IF EXISTS peliculas_vistas;
DROP TABLE IF EXISTS peliculas;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS categorias;

-- Crear tabla categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'user', -- 'admin' o 'user'
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla peliculas
CREATE TABLE peliculas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    fecha_estreno DATE NOT NULL,
    categoria_id INTEGER NOT NULL REFERENCES categorias(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla peliculas_vistas con PK compuesta
CREATE TABLE peliculas_vistas (
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    pelicula_id INTEGER NOT NULL REFERENCES peliculas(id) ON DELETE CASCADE,
    fecha_vista DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (usuario_id, pelicula_id)
);

-- Poblar tabla categorias
INSERT INTO categorias (nombre) VALUES
('Terror'), ('Suspenso'), ('Drama'), ('Comedia');

-- Poblar tabla usuarios
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Laura Castillo', 'correo4@correo.com', '123', 'user'),
('Miguel Herrera', 'correo5@correo.com', '123', 'user'),
('Sofía Ramírez', 'correo6@correo.com', '123', 'user'),
('Carlos Jiménez', 'correo7@correo.com', '123', 'user'),
('Valentina Ríos', 'correo8@correo.com', '123', 'user'),
('Paula Mendoza', 'correo9@correo.com', '123', 'admin'),
('Juan Camargo', 'correo10@correo.com', '123', 'admin');

-- Poblar tabla peliculas 
INSERT INTO peliculas (titulo, fecha_estreno, categoria_id) VALUES
('El legado del miedo', CURRENT_DATE - INTERVAL '3 days', 1),
('Pesadilla Reciente', CURRENT_DATE - INTERVAL '6 days', 1),
('Niebla Mortal', CURRENT_DATE - INTERVAL '8 days', 1),
('El misterio de la niebla', CURRENT_DATE - INTERVAL '10 days', 2),
('La casa de los secretos', CURRENT_DATE - INTERVAL '13 days', 2),
('La última llamada', CURRENT_DATE - INTERVAL '17 days', 2),
('Lágrimas en la lluvia', CURRENT_DATE - INTERVAL '2 days', 3),
('Sueños de papel', CURRENT_DATE - INTERVAL '5 days', 3),
('Risas en cuarentena', CURRENT_DATE - INTERVAL '1 days', 4),
('Vacaciones locas', CURRENT_DATE - INTERVAL '12 days', 4),
('El conjuro', CURRENT_DATE - INTERVAL '1 months', 1),
('La monja', CURRENT_DATE - INTERVAL '2 months', 1),
('It: Capítulo Dos', CURRENT_DATE - INTERVAL '5 months', 1),
('Actividad Paranormal', CURRENT_DATE - INTERVAL '4 months', 1),
('El orfanato', CURRENT_DATE - INTERVAL '8 months', 2),
('El código Enigma', CURRENT_DATE - INTERVAL '1 years', 2),
('Zodiaco', CURRENT_DATE - INTERVAL '10 months', 2),
('El silencio de los inocentes', CURRENT_DATE - INTERVAL '14 months', 2),
('En busca de la felicidad', CURRENT_DATE - INTERVAL '7 months', 3),
('La vida es bella', CURRENT_DATE - INTERVAL '15 months', 3),
('Forrest Gump', CURRENT_DATE - INTERVAL '3 years', 3),
('El club de la pelea', CURRENT_DATE - INTERVAL '2 years', 3),
('¿Qué pasó ayer?', CURRENT_DATE - INTERVAL '9 months', 4),
('Legalmente rubia', CURRENT_DATE - INTERVAL '11 months', 4),
('Supercool', CURRENT_DATE - INTERVAL '2 years', 4),
('La máscara', CURRENT_DATE - INTERVAL '20 months', 4),
('Mi pobre angelito', CURRENT_DATE - INTERVAL '28 months', 4);




