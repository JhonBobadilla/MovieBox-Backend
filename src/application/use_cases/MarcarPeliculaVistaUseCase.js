// Caso de uso para que un usuario marque una película como vista
class MarcarPeliculaVistaUseCase {
  constructor(peliculaRepository, userRepository) {
    // Inyección de los repositorios de películas y usuarios
    this.peliculaRepository = peliculaRepository;
    this.userRepository = userRepository;
  }

  // Ejecuta la lógica para registrar la película como vista por el usuario
  async execute({ usuario_id, pelicula_id }) {
    // Valida que los IDs sean obligatorios
    if (!usuario_id || !pelicula_id) {
      throw new Error('usuario_id y pelicula_id son obligatorios');
    }

    // Verifica que el usuario exista
    const usuario = await this.userRepository.findById(usuario_id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Solo usuarios con rol 'user' pueden marcar películas como vistas
    if (usuario.rol !== 'user') { 
      throw new Error('Solo los usuarios con rol "user" pueden marcar películas como vistas');
    }

    // Registra la visualización en el repositorio
    return await this.peliculaRepository.marcarComoVista(usuario_id, pelicula_id);
  }
}
module.exports = MarcarPeliculaVistaUseCase;

