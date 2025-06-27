class DeletePeliculaUseCase {
  constructor(peliculaRepository, userRepository) {
    this.peliculaRepository = peliculaRepository;
    this.userRepository = userRepository;
  }

  async execute({ pelicula_id, usuario_id }) {
    if (!pelicula_id || !usuario_id) {
      throw new Error('pelicula_id y usuario_id son obligatorios');
    }

    // Verificar que el usuario sea admin
    const user = await this.userRepository.findById(usuario_id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    if (user.rol !== 'admin') {
      throw new Error('Solo un usuario con rol admin puede borrar películas');
    }

    const pelicula = await this.peliculaRepository.findById(pelicula_id);
    if (!pelicula) {
      throw new Error('Película no encontrada');
    }

    // Borrar la película
    await this.peliculaRepository.delete(pelicula_id);
    return { message: 'Película eliminada correctamente' };
  }
}

module.exports = DeletePeliculaUseCase;
