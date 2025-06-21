const express = require('express');
const router = express.Router();
const soldadorController = require('../controllers/soldador.controller');

// Crear nuevo soldador
router.post('/', soldadorController.crearSoldador);

// Obtener todos los soldadores
router.get('/', soldadorController.obtenerSoldadores);

// Obtener un soldador por ID
router.get('/:id', soldadorController.obtenerSoldadorPorId);

// Actualizar un soldador
router.put('/:id', soldadorController.actualizarSoldador);

// Eliminar un soldador
router.delete('/:id', soldadorController.eliminarSoldador);

module.exports = router;
