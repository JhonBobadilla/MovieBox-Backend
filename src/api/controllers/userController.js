const CreateUserUseCase = require('../../application/use_cases/CreateUserUseCase');
const PostgresUserRepository = require('../../infrastructure/repositories/PostgresUserRepository');
const ListUsuariosConPeliculasVistasUseCase = require('../../application/use_cases/ListUsuariosConPeliculasVistasUseCase');

const userRepository = new PostgresUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);

const createUser = async (req, res) => {
  try {
    const user = await createUserUseCase.execute(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listUsuariosConPeliculasVistas = async (req, res) => {
    const useCase = new ListUsuariosConPeliculasVistasUseCase(userRepository);
  try {
    const usuarios = await useCase.execute();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  createUser,
  listUsuariosConPeliculasVistas
};
