const express = require('express');
const router = express.Router();
const { getBIQuery, postBIQuery } = require('../controllers/biController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:queryName', authMiddleware, getBIQuery);
router.post('/query', authMiddleware, postBIQuery);

module.exports = router;
