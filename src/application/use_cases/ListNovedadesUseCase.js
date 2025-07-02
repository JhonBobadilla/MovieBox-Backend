// Caso de uso para listar películas recientes (novedades)
class ListNovedadesUseCase {
  constructor(peliculaRepository) {
    // Inyección del repositorio de películas
    this.peliculaRepository = peliculaRepository;
  }
  // Ejecuta la obtención de novedades desde el repositorio
  async execute() {
    return await this.peliculaRepository.listNovedades();
  }
}
module.exports = ListNovedadesUseCase;
