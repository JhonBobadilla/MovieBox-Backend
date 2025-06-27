class PeliculaRepository {
  async create(pelicula) {
    throw new Error('Método no implementado');
  }
  async list({ titulo, categoria, page, limit, order }) {
        throw new Error('Not implemented');
  }
  async listNovedades() {
        throw new Error('Método no implementado');
  }
  async marcarComoVista(usuario_id, pelicula_id) {
        throw new Error('Método no implementado');
  }
}

module.exports = PeliculaRepository;
