// Entidad de dominio para representar una película
class Pelicula {
  constructor({ titulo, fecha_estreno, categoria_id }) {
    // Título de la película
    this.titulo = titulo;
    // Fecha de estreno
    this.fecha_estreno = fecha_estreno;
    // ID de la categoría asociada
    this.categoria_id = categoria_id;
  }
}

module.exports = Pelicula;
