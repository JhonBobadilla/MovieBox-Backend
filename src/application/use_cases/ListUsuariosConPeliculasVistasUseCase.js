// Caso de uso para listar usuarios junto con las películas que han visto
class ListUsuariosConPeliculasVistasUseCase {
  constructor(userRepository) {
    // Inyección del repositorio de usuarios
    this.userRepository = userRepository;
  }

  // Ejecuta la consulta de usuarios y sus películas vistas
  async execute() {
    return await this.userRepository.listUsuariosConPeliculasVistas();
  }
}

module.exports = ListUsuariosConPeliculasVistasUseCase;
