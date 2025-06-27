class PeliculaRepository {
  async create(pelicula) {
    throw new Error('Método no implementado');
  }
  async list({ titulo, categoria, page, limit, order }) {
        throw new Error('Not implemented');
  }
}

module.exports = PeliculaRepository;
