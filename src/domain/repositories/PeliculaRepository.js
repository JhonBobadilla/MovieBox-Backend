// Interfaz base (abstracta) para el repositorio de películas.
// Define los métodos que toda implementación concreta debe incluir.
class PeliculaRepository {
  // Crear una nueva película
  async create(pelicula) {
    throw new Error('Método no implementado');
  }
  // Listar películas con filtros y paginación
  async list({ titulo, categoria, page, limit, order }) {
    throw new Error('Not implemented');
  }
  // Listar novedades (películas recientes)
  async listNovedades() {
    throw new Error('Método no implementado');
  }
  // Marcar una película como vista por un usuario
  async marcarComoVista(usuario_id, pelicula_id) {
    throw new Error('Método no implementado');
  }
}

module.exports = PeliculaRepository;
