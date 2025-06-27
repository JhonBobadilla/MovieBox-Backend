const CreatePeliculaUseCase = require('../../application/use_cases/CreatePeliculaUseCase');
const PostgresPeliculaRepository = require('../../infrastructure/repositories/PostgresPeliculaRepository');

const peliculaRepository = new PostgresPeliculaRepository();
const createPeliculaUseCase = new CreatePeliculaUseCase(peliculaRepository);

const crearPelicula = async (req, res) => {
  try {
    const pelicula = await createPeliculaUseCase.execute(req.body);
    res.status(201).json(pelicula);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  crearPelicula,
};
