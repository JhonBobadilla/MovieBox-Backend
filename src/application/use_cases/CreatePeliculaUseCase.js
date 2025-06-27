class CreatePeliculaUseCase {
  constructor(peliculaRepository, userRepository) {
    this.peliculaRepository = peliculaRepository;
    this.userRepository = userRepository;
  }

  async execute(data) {
  const { titulo, fecha_estreno, categoria_id, usuario_id } = data;  
   
    if (!titulo || !fecha_estreno || !categoria_id || !usuario_id) {
      throw new Error('Todos los campos son obligatorios');
    }
  
  const user = await this.userRepository.findById(usuario_id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (user.rol !== 'admin') {
      throw new Error('Solo un usuario con rol admin puede crear películas');
    }

    return await this.peliculaRepository.create({ titulo, fecha_estreno, categoria_id });
  }
}

module.exports = CreatePeliculaUseCase;
