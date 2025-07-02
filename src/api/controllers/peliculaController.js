// Importación de los casos de uso para la gestión de películas y usuarios.
// Cada caso de uso implementa una funcionalidad del dominio y permite mantener separada la lógica de negocio.
const CreatePeliculaUseCase = require('../../application/use_cases/CreatePeliculaUseCase');
const ListPeliculasUseCase = require('../../application/use_cases/ListPeliculasUseCase');
const PostgresPeliculaRepository = require('../../infrastructure/repositories/PostgresPeliculaRepository');
const ListNovedadesUseCase = require('../../application/use_cases/ListNovedadesUseCase');
const MarcarPeliculaVistaUseCase = require('../../application/use_cases/MarcarPeliculaVistaUseCase');
const PostgresUserRepository = require('../../infrastructure/repositories/PostgresUserRepository');
const DeletePeliculaUseCase = require('../../application/use_cases/DeletePeliculaUseCase');
const UpdatePeliculaUseCase = require('../../application/use_cases/UpdatePeliculaUseCase');

// Instanciación de los repositorios concretos para PostgreSQL, permitiendo acceder y manipular los datos persistidos.
const peliculaRepository = new PostgresPeliculaRepository();
const userRepository = new PostgresUserRepository();

// Inicialización de cada caso de uso, inyectando los repositorios necesarios para trabajar de manera desacoplada.
const updatePeliculaUseCase = new UpdatePeliculaUseCase(peliculaRepository, userRepository);
const deletePeliculaUseCase = new DeletePeliculaUseCase(peliculaRepository, userRepository);
const createPeliculaUseCase = new CreatePeliculaUseCase(peliculaRepository, userRepository);
const listPeliculasUseCase = new ListPeliculasUseCase(peliculaRepository);
const listNovedadesUseCase = new ListNovedadesUseCase(peliculaRepository);
const marcarPeliculaVistaUseCase = new MarcarPeliculaVistaUseCase(peliculaRepository, userRepository);

/**
 * Controlador para crear una nueva película.
 * Utiliza el caso de uso CreatePeliculaUseCase, que valida los datos y persiste la nueva película en la base de datos.
 */
const crearPelicula = async (req, res) => {
  try {
    const pelicula = await createPeliculaUseCase.execute(req.body);
    res.status(201).json(pelicula);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controlador para listar películas con filtros opcionales.
 * Permite filtrar por título, categoría, aplicar paginación y ordenamiento usando el caso de uso ListPeliculasUseCase.
 */
const listPeliculas = async (req, res) => {
    try {
        const { titulo, categoria, page, limit, order } = req.query;
        const peliculas = await listPeliculasUseCase.execute({ titulo, categoria, page, limit, order });
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Controlador para listar novedades.
 * Devuelve solo las películas que han sido estrenadas recientemente, utilizando el caso de uso ListNovedadesUseCase.
 */
const listNovedades = async (req, res) => {
  try {
    const novedades = await listNovedadesUseCase.execute();
    res.json(novedades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controlador para marcar una película como vista por un usuario.
 * Utiliza MarcarPeliculaVistaUseCase para registrar la visualización y asegurar que no se duplique el registro.
 */
const marcarComoVista = async (req, res) => {
  try {
    const { usuario_id, pelicula_id } = req.body;
    const resultado = await marcarPeliculaVistaUseCase.execute({ usuario_id, pelicula_id });

    res.status(201).json({
      message: 'Película marcada como vista',
      resultado: {
        usuario_id: resultado.usuario_id,
        pelicula_id: resultado.pelicula_id,
        fecha_vista: resultado.fecha_vista
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controlador para borrar una película existente.
 * Elimina la película siempre que exista y el usuario tenga los permisos adecuados, usando DeletePeliculaUseCase.
 */
const borrarPelicula = async (req, res) => {
  try {
    const { pelicula_id, usuario_id } = req.body;

    const resultado = await deletePeliculaUseCase.execute({ pelicula_id, usuario_id });
    res.json(resultado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controlador para actualizar los datos de una película.
 * Permite modificar los campos de una película existente, siempre que el usuario tenga permisos y los datos sean válidos.
 */
const actualizarPelicula = async (req, res) => {
  try {
    const data = req.body; // Se espera pelicula_id, usuario_id y los campos a actualizar.
    const updated = await updatePeliculaUseCase.execute(data);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Exportación de todos los controladores para su uso en las rutas de la API.
module.exports = {
  actualizarPelicula,
  crearPelicula,
  listPeliculas,
  listNovedades,
  marcarComoVista,
  borrarPelicula
};

