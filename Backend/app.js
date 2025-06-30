const express = require('express');
const app = express();
const db = require('./models');
require('dotenv').config();

app.use(express.json());

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));

// Rutas
const usuarioRoutes = require('./routes/usuario.routes');
app.use('/api/usuarios', usuarioRoutes);

const rolRoutes = require('./routes/rol.routes');
app.use('/api/roles', rolRoutes);

const soldaduraRoutes = require('./routes/soldadura.routes');
app.use('/api/soldaduras', soldaduraRoutes);

const controlCalidadRoutes = require('./routes/controlCalidad.routes');
app.use('/api/control-calidad', controlCalidadRoutes);

const proyectoRoutes = require('./routes/proyecto.routes');
app.use('/api/proyectos', proyectoRoutes);

const tareaRoutes = require('./routes/tarea.routes');
app.use('/api/tareas', tareaRoutes);

const categoriaMaterialRoutes = require('./routes/categoriaMaterial.routes');
app.use('/api/categorias-material', categoriaMaterialRoutes);

const materialRoutes = require('./routes/material.routes');
app.use('/api/materiales', materialRoutes);

const solicitudMaterialRoutes = require('./routes/solicitudMaterial.routes');
app.use('/api/solicitudes-material', solicitudMaterialRoutes);

const auditoriaRoutes = require('./routes/auditoria.routes');
app.use('/api/auditorias', auditoriaRoutes);

const dashboardRoutes = require('./routes/dashboard.routes');
app.use('/api/dashboards', dashboardRoutes);



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
