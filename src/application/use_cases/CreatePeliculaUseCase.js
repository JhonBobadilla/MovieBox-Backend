class CreatePeliculaUseCase {
  constructor(peliculaRepository) {
    this.peliculaRepository = peliculaRepository;
  }

  async execute(data) {
    if (!data.titulo || !data.fecha_estreno || !data.categoria_id) {
      throw new Error('Todos los campos son obligatorios');
    }
    return await this.peliculaRepository.create(data);
  }
}

module.exports = CreatePeliculaUseCase;
