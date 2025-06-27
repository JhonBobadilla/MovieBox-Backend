class ListUsuariosConPeliculasVistasUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    
    return await this.userRepository.listUsuariosConPeliculasVistas();
  }
}

module.exports = ListUsuariosConPeliculasVistasUseCase;
