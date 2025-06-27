const CreatePeliculaUseCase = require('../../application/use_cases/CreatePeliculaUseCase');
const ListPeliculasUseCase = require('../../application/use_cases/ListPeliculasUseCase');
const PostgresPeliculaRepository = require('../../infrastructure/repositories/PostgresPeliculaRepository');
const ListNovedadesUseCase = require('../../application/use_cases/ListNovedadesUseCase');
const MarcarPeliculaVistaUseCase = require('../../application/use_cases/MarcarPeliculaVistaUseCase');
const PostgresUserRepository = require('../../infrastructure/repositories/PostgresUserRepository');

const peliculaRepository = new PostgresPeliculaRepository();
const userRepository = new PostgresUserRepository();

const createPeliculaUseCase = new CreatePeliculaUseCase(peliculaRepository, userRepository);
const listPeliculasUseCase = new ListPeliculasUseCase(peliculaRepository);
const listNovedadesUseCase = new ListNovedadesUseCase(peliculaRepository);
const marcarPeliculaVistaUseCase = new MarcarPeliculaVistaUseCase(peliculaRepository, userRepository);

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

const listNovedades = async (req, res) => {
  try {
    const novedades = await listNovedadesUseCase.execute();
    res.json(novedades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const marcarComoVista = async (req, res) => {
  try {
    const { usuario_id, pelicula_id } = req.body;
    const resultado = await marcarPeliculaVistaUseCase.execute({ usuario_id, pelicula_id });
    res.status(201).json({ message: 'Película marcada como vista', resultado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  crearPelicula,
  listPeliculas,
  listNovedades,
  marcarComoVista
};
