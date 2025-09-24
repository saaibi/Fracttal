const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// POST /api/auth/registro
router.post('/registro', register);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/perfil
router.get('/perfil', authMiddleware, getProfile);

module.exports = router;
