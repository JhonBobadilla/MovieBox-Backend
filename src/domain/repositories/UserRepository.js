// Interfaz base para el repositorio de usuarios.
// Define los métodos que deben implementar los repositorios concretos.
class UserRepository {
  // Crea un nuevo usuario
  async create(user) {
    throw new Error('Method not implemented');
  }
  // Lista usuarios junto con las películas que han visto
  async listUsuariosConPeliculasVistas() {
    throw new Error('Method not implemented');
  }
}

module.exports = UserRepository;
