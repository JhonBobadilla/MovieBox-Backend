class Pelicula {
  constructor({ titulo, fecha_estreno, categoria_id }) {
    this.titulo = titulo;
    this.fecha_estreno = fecha_estreno;
    this.categoria_id = categoria_id;
  }
}

module.exports = Pelicula;
