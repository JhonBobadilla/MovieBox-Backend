# MovieBox-Backend (NodeJS, Express)

**API Rest en NodeJS para la gestión de usuarios, películas y categorías.**

**Desarrollador:** Jhon Alexander Bobadilla Lombana

---

## 1. Descripción

MovieBox-Backend es una API Rest desarrollada en NodeJS que permite gestionar usuarios, películas y categorías. Incluye datos precargados de categorías (Terror, Suspenso, Drama y Comedia), permite la creación de usuarios con roles ("admin" y "user") y la gestión completa de películas con sus categorías asociadas. Entre sus funcionalidades: listar películas, filtrar por título y categoría, paginar, limitar resultados, ordenar por fecha de estreno, consultar novedades (películas estrenadas en las últimas tres semanas), marcar películas como vistas, listar usuarios con sus películas vistas, borrar y actualizar películas.

La API está creada con una arquitectura (Clean Architecture), separando las responsabilidades en: src/domain, src/application, src/infrastructure y src/api.

Así mismo implementa MVCC (Multi-Version Concurrency Control) característica del motor de base de datos postgreSQL.

Se desarrolla en la rama dev pero se efectua merge a main.

---

## 2. Tabla de Contenidos

- [Clonar el repositorio](#clonar)  
- [Modelo Relacional](#modelo-relacional)  
- [Scripts SQL (DDL, DML) y Consultas CRUD](#Scripts)  
- [Instrucciones de ejecución](#ejecución)  
- [Control de versiones y ramas Git](#control-de-versiones-y-ramas-git)  
- [Dockerización de la API](#dockerización-de-la-api)
- [Integración y Despliegue Continuo (CI/CD)](#integración-y-despliegue-continuo-cicd)
 
---

## 3. Clonar el repositorio

```bash

git clone https://github.com/JhonBobadilla/MovieBox-Backend

```
---

## 4. Modelo Relacional

Ver en docs/modelo_relacional.md

---

## 5. Scripts SQL (DDL, DML) y Consultas CRUD

Ver en docs/script_db.sql

---

## 6. Instrucciones de ejecución

A continuación se describe cómo probar los endpoints utilizando Postman.

---

Abrir Postman

Ir a “Import”

Arrastrar el archivo "MovieBox API.postman_collection.json" en la carpeta docs

---

### POST/api/users => crear usuario => https://movieboxjhon-0fc8b30f0b82.herokuapp.com/api/users

Body de creación:

```bash
{
  "name": "Carlos",
  "email": "correo1@correo.com",
  "password": "123",
  "role": "admin" // Roles disponibles "admin" y "user"
}
```

Respuesta esperada "201 Created"

---

### POST/api/peliculas => crear pelicula => https://movieboxjhon-0fc8b30f0b82.herokuapp.com/api/peliculas

Crea UNICAMENTE CON id de rol "admin" (ver tabla usuarios columna rol), con el siguiente Body:

```bash
{
  "titulo": "El Conjuro",
  "fecha_estreno": "2023-06-01",
  "categoria_id": 1 // 1=Terror, 2=Suspenso, 3=Drama y 4=Comedia.
  "usuario_id": 15 // solo crea con id de admin, (ver tabla usuarios columna rol).
}
```

Respuesta esperada "201 Created"

---

### GET/api/peliculas => listar peliculas => https://movieboxjhon-0fc8b30f0b82.herokuapp.com/api/peliculas

En postman - sección "params" emplear uno o varios filtros:
Por defecto (sin filtro) mostrará 10 peliculas que corresponden a la pagina 1.

Keys disponibles: 

- titulo: Filtra por el texto en el nombre de la película.
- categoria: Filtra por el nombre de la categoría de la película (Terror, Suspenso, Drama y Comedia).
- page: Número de página para paginación (ejemplo: 1, 2, 3...).
- limit: Cantidad máxima de películas por página (ejemplo: 10, 20, ...).
- order: Orden de la fecha de estreno (asc para más antiguas primero, desc para más nuevas primero).

Ejemplo de aplicación de filtros en Postman - sección "params" llenar los campos.

- Key = titulo      Value = bella
- Key = categoria   Value = Drama
- Key = page        Value = 2
- Key = limit       Value = 5
- Key = order       Value = desc

---

### GET/api/peliculas => listar peliculas "novedades" => https://movieboxjhon-0fc8b30f0b82.herokuapp.com/api/peliculas/novedades
   (fecha de estreno inferior a tres semanas)
   
   Respuesta esperada "200 ok"

   ---

### POST/api/peliculas => marcar peliculas como vistas => https://movieboxjhon-0fc8b30f0b82.herokuapp.com/api/peliculas/vista
   
   Marca las peliculas como vistas UNICAMENTE en un rol "user"

   Body para petición:

```bash
{
  "usuario_id": 5, // solo crea con id de user, (ver tabla usuarios columna rol).
  "pelicula_id": 7
} 
```

   Respuesta esperada "201 Created" 

   ---

### GET/api/peliculas-vistas => lista usuarios con las peliculas que han visto "peliculas-vistas"=> https://movieboxjhon-0fc8b30f0b82.herokuapp.com/api/peliculas-vistas   

Lista usuarios con las peliculas que han visto.

Respuesta esperada "200 ok"

---

### DELETE/api/peliculas/borrar => borra una pelicula => https://movieboxjhon-0fc8b30f0b82.herokuapp.com/api/peliculas/borrar 

Borra peliculas UNICAMENTE en un rol "admin"

```bash
{
  "pelicula_id": 5,
  "usuario_id": 4 // Unicamente rol de "admin"
}
```

Respuesta esperada "200 ok" "Película eliminada correctamente"

---

### PUT/api/peliculas7actualizar => actualiza una pelicula => https://movieboxjhon-0fc8b30f0b82.herokuapp.com/api/peliculas/actualizar

Actualiza las peliculas UNICAMENTE en un rol "admin"

```bash
{
  "pelicula_id": 7,
  "usuario_id": 1, // Unicamente rol de "admin" 
  "titulo": "La Monja 2",
  "fecha_estreno": "2024-05-25",
  "categoria_id": 2
}
```

El resultado esperado es el Body actualizado.

---

## 7. Control de versiones y ramas Git

El flujo de trabajo usa las siguientes ramas:

- dev: Desarrollo activo con commits frecuentes.
- main: Versión estable para producción.

dev → main

Los merges se realizan de `dev` a `main` para releases estables.

---

## 8. Dockerización de la API

Como parte de las buenas prácticas de DevOps y despliegue, se incluyeron los archivos necesarios para la dockerización de la API:

Dockerfile
docker-compose.yml

Estos archivos han sido preparados para facilitar la construcción y el despliegue futuro de la API en contenedores Docker, permitiendo una mayor portabilidad y escalabilidad del sistema.

---

## 9. Integración y Despliegue Continuo (CI/CD)

Descripción de cómo implementaría un flujo de integración y despliegue
continuo (CI/CD)

Para asegurar la calidad, la integración continua y la entrega automatizada de la API, se incluye en este repositorio un archivo Jenkinsfile con la definición de un pipeline básico de CI/CD usando Jenkins.

---
