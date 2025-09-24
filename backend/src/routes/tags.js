const express = require('express');
const router = express.Router();
const { getAllTags, createTag, createTareaEtiqueta } = require('../controllers/tagController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', getAllTags);
router.post('/', createTag);
router.post('/tarea-etiquetas', createTareaEtiqueta);

module.exports = router;