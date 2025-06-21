const express = require('express');
const router = express.Router();
const soldadorController = require('../controllers/soldador.controller');

// Crear nuevo soldador
router.post('/', soldadorController.createSoldador);

// Obtener todos los soldadores
router.get('/', soldadorController.readSoldadores);

// Obtener un soldador por ID
router.get('/:id', soldadorController.readSoldador);

// Actualizar un soldador
router.put('/:id', soldadorController.updateSoldador);

// Eliminar un soldador
router.delete('/:id', soldadorController.deleteSoldador);

module.exports = router;
