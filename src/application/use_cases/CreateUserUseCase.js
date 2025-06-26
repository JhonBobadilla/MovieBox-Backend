class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    if (!['admin', 'user'].includes(userData.role)) {
      throw new Error('Rol inválido: debe ser admin o user');
    }

    return await this.userRepository.create(userData);
  }
}
module.exports = CreateUserUseCase;
