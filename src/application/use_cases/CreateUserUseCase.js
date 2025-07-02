// Caso de uso para crear un nuevo usuario
class CreateUserUseCase {
  constructor(userRepository) {
    // Inyección del repositorio de usuarios
    this.userRepository = userRepository;
  }

  // Ejecuta la lógica de creación de usuario
  async execute(userData) {
    // Valida que el rol sea válido
    if (!['admin', 'user'].includes(userData.role)) {
      throw new Error('Rol inválido: debe ser admin o user');
    }

    // Crea el usuario en el repositorio
    return await this.userRepository.create(userData);
  }
}
module.exports = CreateUserUseCase;
