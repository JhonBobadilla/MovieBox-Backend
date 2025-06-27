class ListPeliculasUseCase {
    constructor(peliculaRepository) {
        this.peliculaRepository = peliculaRepository;
    }

    async execute({ titulo, categoria, page = 1, limit = 10, order = 'desc' }) {
        // Validar page y limit
        page = parseInt(page) > 0 ? parseInt(page) : 1;
        limit = parseInt(limit) > 0 ? parseInt(limit) : 10;
        // Llama al repositorio con los filtros
        return await this.peliculaRepository.list({
            titulo, categoria, page, limit, order
        });
    }
}

module.exports = ListPeliculasUseCase;
