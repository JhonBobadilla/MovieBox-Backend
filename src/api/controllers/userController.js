// Importa el caso de uso para crear usuarios
const CreateUserUseCase = require('../../application/use_cases/CreateUserUseCase');
// Importa el repositorio de usuarios en PostgreSQL
const PostgresUserRepository = require('../../infrastructure/repositories/PostgresUserRepository');
// Importa el caso de uso para listar usuarios con películas vistas
const ListUsuariosConPeliculasVistasUseCase = require('../../application/use_cases/ListUsuariosConPeliculasVistasUseCase');

// Crea una instancia del repositorio de usuarios
const userRepository = new PostgresUserRepository();
// Prepara el caso de uso para crear usuarios
const createUserUseCase = new CreateUserUseCase(userRepository);

/**
 * Crea un nuevo usuario y responde con el resultado.
 */
const createUser = async (req, res) => {
  try {
    const user = await createUserUseCase.execute(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Lista usuarios junto con las películas que han visto.
 */
const listUsuariosConPeliculasVistas = async (req, res) => {
    const useCase = new ListUsuariosConPeliculasVistasUseCase(userRepository);
  try {
    const usuarios = await useCase.execute();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exporta los controladores
module.exports = { 
  createUser,
  listUsuariosConPeliculasVistas
};


