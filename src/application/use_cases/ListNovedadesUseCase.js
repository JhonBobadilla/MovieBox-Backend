class ListNovedadesUseCase {
  constructor(peliculaRepository) {
    this.peliculaRepository = peliculaRepository;
  }
  async execute() {
    return await this.peliculaRepository.listNovedades();
  }
}
module.exports = ListNovedadesUseCase;
