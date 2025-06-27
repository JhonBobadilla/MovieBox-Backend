class UpdatePeliculaUseCase {
  constructor(peliculaRepository, userRepository) {
    this.peliculaRepository = peliculaRepository;
    this.userRepository = userRepository;
  }

  async execute(data) {
    const { pelicula_id, usuario_id, titulo, fecha_estreno, categoria_id } = data;

    if (!pelicula_id || !usuario_id) {
      throw new Error('pelicula_id y usuario_id son obligatorios');
    }

    // Verificar que el usuario sea admin
    const user = await this.userRepository.findById(usuario_id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    if (user.rol !== 'admin') {
      throw new Error('Solo un usuario con rol admin puede actualizar películas');
    }

    // Verificar que la película exista
    const pelicula = await this.peliculaRepository.findById(pelicula_id);
    if (!pelicula) {
      throw new Error('Película no encontrada');
    }

    // Actualizar solo los campos que vienen en el body
    const updateData = {};
    if (titulo) updateData.titulo = titulo;
    if (fecha_estreno) updateData.fecha_estreno = fecha_estreno;
    if (categoria_id) updateData.categoria_id = categoria_id;

    if (Object.keys(updateData).length === 0) {
      throw new Error('No hay campos para actualizar');
    }

    // Ejecuta el update en el repositorio
    const updated = await this.peliculaRepository.update(pelicula_id, updateData);
    return updated;
  }
}

module.exports = UpdatePeliculaUseCase;
