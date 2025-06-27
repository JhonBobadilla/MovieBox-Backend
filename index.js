require('dotenv').config();

const express = require('express');
const app = express();

const userRoutes = require('./src/api/routes/userRoutes');
const peliculaRoutes = require('./src/api/routes/peliculaRoutes');


app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', peliculaRoutes);
app.get('/', (req, res) => {
  res.send('API MovieBox-Backend funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

