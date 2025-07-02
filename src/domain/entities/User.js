// Entidad de dominio que representa a un usuario
class User {
  constructor({ id, name, email, role }) {
    // Identificador único del usuario
    this.id = id;
    // Nombre del usuario
    this.name = name;
    // Correo electrónico del usuario
    this.email = email;
    // Rol del usuario (admin o user)
    this.role = role;
  }
}
module.exports = User;
