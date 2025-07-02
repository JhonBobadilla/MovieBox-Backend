// Caso de uso para crear una nueva película
class CreatePeliculaUseCase {
  constructor(peliculaRepository, userRepository) {
    // Inyección de repositorios necesarios
    this.peliculaRepository = peliculaRepository;
    this.userRepository = userRepository;
  }

  // Ejecuta la lógica de creación de película
  async execute(data) {
    const { titulo, fecha_estreno, categoria_id, usuario_id } = data;

    // Valida que todos los campos sean obligatorios
    if (!titulo || !fecha_estreno || !categoria_id || !usuario_id) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Busca el usuario que intenta crear la película
    const user = await this.userRepository.findById(usuario_id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Solo permite crear películas a usuarios con rol admin
    if (user.rol !== 'admin') {
      throw new Error('Solo un usuario con rol admin puede crear películas');
    }

    // Crea la película en el repositorio
    return await this.peliculaRepository.create({ titulo, fecha_estreno, categoria_id });
  }
}

module.exports = CreatePeliculaUseCase;

