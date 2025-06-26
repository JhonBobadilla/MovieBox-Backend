const CreateUserUseCase = require('../../application/use_cases/CreateUserUseCase');
const PostgresUserRepository = require('../../infrastructure/repositories/PostgresUserRepository');

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

module.exports = { createUser };
