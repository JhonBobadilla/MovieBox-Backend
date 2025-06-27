const CreatePeliculaUseCase = require('../../application/use_cases/CreatePeliculaUseCase');
const ListPeliculasUseCase = require('../../application/use_cases/ListPeliculasUseCase');
const PostgresPeliculaRepository = require('../../infrastructure/repositories/PostgresPeliculaRepository');
const ListNovedadesUseCase = require('../../application/use_cases/ListNovedadesUseCase');
const MarcarPeliculaVistaUseCase = require('../../application/use_cases/MarcarPeliculaVistaUseCase');
const PostgresUserRepository = require('../../infrastructure/repositories/PostgresUserRepository');
const DeletePeliculaUseCase = require('../../application/use_cases/DeletePeliculaUseCase');
const UpdatePeliculaUseCase = require('../../application/use_cases/UpdatePeliculaUseCase');

const peliculaRepository = new PostgresPeliculaRepository();
const userRepository = new PostgresUserRepository();

const updatePeliculaUseCase = new UpdatePeliculaUseCase(peliculaRepository, userRepository);
const deletePeliculaUseCase = new DeletePeliculaUseCase(peliculaRepository, userRepository);
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

const borrarPelicula = async (req, res) => {
  try {
    const { pelicula_id, usuario_id } = req.body;

    const resultado = await deletePeliculaUseCase.execute({ pelicula_id, usuario_id });
    res.json(resultado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const actualizarPelicula = async (req, res) => {
  try {
    const data = req.body; // Debe incluir pelicula_id, usuario_id y los campos a actualizar
    const updated = await updatePeliculaUseCase.execute(data);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  actualizarPelicula,
  crearPelicula,
  listPeliculas,
  listNovedades,
  marcarComoVista,
  borrarPelicula
};
