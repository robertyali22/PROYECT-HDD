const express = require('express');
const app = express();
const db = require('./models');
require('dotenv').config();

app.use(express.json());

// Rutas
const usuarioRoutes = require('./routes/usuario.routes');
app.use('/api/usuarios', usuarioRoutes);

// Sincronizar modelos con DB
db.sequelize.sync({ alter: true }).then(() => {
  console.log('<<<<<<Base de datos sincronizada>>>>>>');
}).catch((err) => {
  console.error('Error al sincronizar la base de datos:', err);
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
