const express = require('express');
const router = express.Router();
const { getAllTags, createTag } = require('../controllers/tagController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', getAllTags);
router.post('/', createTag);

module.exports = router;