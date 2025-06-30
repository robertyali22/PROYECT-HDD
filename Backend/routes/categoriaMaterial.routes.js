const express = require('express');
const router = express.Router();
const categoriaMaterialController = require('../controllers/categoriaMaterial.controller');

router.post('/', categoriaMaterialController.createCategoriaMaterial);
router.get('/', categoriaMaterialController.readCategoriasMaterial);
router.get('/:id', categoriaMaterialController.readCategoriaMaterial);
router.put('/:id', categoriaMaterialController.updateCategoriaMaterial);
router.delete('/:id', categoriaMaterialController.deleteCategoriaMaterial);

module.exports = router;
