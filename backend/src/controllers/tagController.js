const db = require('../database/db');

const getAllTags = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await db.query('SELECT * FROM etiquetas WHERE usuario_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTag = async (req, res) => {
  const { nombre } = req.body;
  const userId = req.userId;

  try {
    const result = await db.query(
      'INSERT INTO etiquetas (nombre, usuario_id) VALUES ($1, $2) RETURNING *',
      [nombre, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTareaEtiqueta = async (req, res) => {
  const { tarea_id, etiqueta_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO fracttaldb.tarea_etiquetas (tarea_id, etiqueta_id) VALUES ($1, $2) RETURNING *',
      [tarea_id, etiqueta_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllTags, createTag, createTareaEtiqueta };
