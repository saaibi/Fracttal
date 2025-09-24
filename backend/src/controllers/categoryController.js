const db = require('../database/db');

const getAllCategories = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await db.query('SELECT * FROM categorias WHERE usuario_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  const { nombre } = req.body;
  const userId = req.userId;

  try {
    const result = await db.query(
      'INSERT INTO categorias (nombre, usuario_id) VALUES ($1, $2) RETURNING *',
      [nombre, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const userId = req.userId;

  try {
    const result = await db.query(
      'UPDATE categorias SET nombre = $1 WHERE id = $2 AND usuario_id = $3 RETURNING *',
      [nombre, id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const result = await db.query('DELETE FROM categorias WHERE id = $1 AND usuario_id = $2 RETURNING *', [id, userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };
