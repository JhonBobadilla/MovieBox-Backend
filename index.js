require('dotenv').config();

const express = require('express');
const app = express();

const userRoutes = require('./src/api/routes/userRoutes');
const peliculaRoutes = require('./src/api/routes/peliculaRoutes');

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/peliculas', peliculaRoutes);

app.get('/', (req, res) => {
  res.send('🚀Bienvenido a API MovieBox-Backend, esta API está funcionando correctamente 🚀 - Recuerda visitar https://github.com/JhonBobadilla/MovieBox-Backend - en el punto 6 del README.md está la instrucción detallada de pruebas en Postman...🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
