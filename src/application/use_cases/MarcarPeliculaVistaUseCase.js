class MarcarPeliculaVistaUseCase {
  constructor(peliculaRepository, userRepository) {
    this.peliculaRepository = peliculaRepository;
    this.userRepository = userRepository;
  }

  async execute({ usuario_id, pelicula_id }) {
    if (!usuario_id || !pelicula_id) {
      throw new Error('usuario_id y pelicula_id son obligatorios');
    }

    const usuario = await this.userRepository.findById(usuario_id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    if (usuario.rol !== 'user') { 
      throw new Error('Solo los usuarios con rol "user" pueden marcar películas como vistas');
    }

    return await this.peliculaRepository.marcarComoVista(usuario_id, pelicula_id);
  }
}
module.exports = MarcarPeliculaVistaUseCase;
