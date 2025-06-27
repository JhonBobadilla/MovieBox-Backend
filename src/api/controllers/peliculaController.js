const CreatePeliculaUseCase = require('../../application/use_cases/CreatePeliculaUseCase');
const ListPeliculasUseCase = require('../../application/use_cases/ListPeliculasUseCase');
const PostgresPeliculaRepository = require('../../infrastructure/repositories/PostgresPeliculaRepository');

const peliculaRepository = new PostgresPeliculaRepository();
const createPeliculaUseCase = new CreatePeliculaUseCase(peliculaRepository);
const listPeliculasUseCase = new ListPeliculasUseCase(peliculaRepository);

const crearPelicula = async (req, res) => {
  try {
    const pelicula = await createPeliculaUseCase.execute(req.body);
    res.status(201).json(pelicula);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listPeliculas = async (req, res) => {
    try {
        const { titulo, categoria, page, limit, order } = req.query;
        const peliculas = await listPeliculasUseCase.execute({ titulo, categoria, page, limit, order });
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
  crearPelicula,
  listPeliculas
};
