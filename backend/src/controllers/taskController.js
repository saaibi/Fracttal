const db = require('../database/db');
const format = require('pg-format');

const getAllTasks = async (req, res) => {
  const { completada, categoria, prioridad, fecha_vencimiento, busqueda, etiquetas, ordenar, direccion } = req.query;
  const userId = req.userId;

  let query = "SELECT t.*, c.nombre as categoria_nombre, STRING_AGG(e.nombre, ', ') as etiquetas FROM tareas t LEFT JOIN categorias c ON t.categoria_id = c.id LEFT JOIN tarea_etiquetas te ON t.id = te.tarea_id LEFT JOIN etiquetas e ON te.etiqueta_id = e.id WHERE t.usuario_id = $1";
  const queryParams = [userId];
  let paramIndex = 2;

  if (completada) {
    query += ` AND t.completada = $${paramIndex++}`;
    queryParams.push(completada);
  }

  if (categoria) {
    query += ` AND t.categoria_id = $${paramIndex++}`;
    queryParams.push(categoria);
  }

  if (prioridad) {
    query += ` AND t.prioridad = $${paramIndex++}`;
    queryParams.push(prioridad);
  }

  if (fecha_vencimiento) {
    query += ` AND t.fecha_vencimiento = $${paramIndex++}`;
    queryParams.push(fecha_vencimiento);
  }

  if (busqueda) {
    query += ` AND (t.titulo ILIKE $${paramIndex} OR t.descripcion ILIKE $${paramIndex++})`
    queryParams.push(`%${busqueda}%`);
  }

  if (etiquetas) {
    const tags = etiquetas.split(',');
    query += ` AND e.nombre = ANY($${paramIndex++})`
    queryParams.push(tags);
  }
  
  query += ' GROUP BY t.id, c.nombre';

  if (ordenar) {
    const sortFields = ['creado_en', 'fecha_vencimiento', 'prioridad', 'titulo'];
    if (sortFields.includes(ordenar)) {
      const sortDirection = direccion === 'desc' ? 'DESC' : 'ASC';
      query += format(' ORDER BY %I %s', ordenar, sortDirection);
    }
  }

  try {
    const result = await db.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
    const { titulo, descripcion, fecha_vencimiento, prioridad, categoria_id, etiquetas } = req.body;
    const userId = req.userId;

    try {
        const result = await db.query(
            'INSERT INTO tareas (titulo, descripcion, fecha_vencimiento, prioridad, categoria_id, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [titulo, descripcion, fecha_vencimiento, prioridad, categoria_id, userId]
        );
        const newTask = result.rows[0];

        if (etiquetas && etiquetas.length > 0) {
            const tareaEtiquetasValues = etiquetas.map(etiqueta_id => [newTask.id, etiqueta_id]);
            const query = format('INSERT INTO tarea_etiquetas (tarea_id, etiqueta_id) VALUES %L', tareaEtiquetasValues);
            await db.query(query);
        }

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha_vencimiento, prioridad, categoria_id } = req.body;
    const userId = req.userId;

    try {
        const result = await db.query(
            'UPDATE tareas SET titulo = $1, descripcion = $2, fecha_vencimiento = $3, prioridad = $4, categoria_id = $5, actualizado_en = NOW() WHERE id = $6 AND usuario_id = $7 RETURNING *',
            [titulo, descripcion, fecha_vencimiento, prioridad, categoria_id, id, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const result = await db.query('DELETE FROM tareas WHERE id = $1 AND usuario_id = $2 RETURNING *', [id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const completeTask = async (req, res) => {
    const { id } = req.params;
    const { completada } = req.body;
    const userId = req.userId;

    try {
        const result = await db.query(
            'UPDATE tareas SET completada = $1, actualizado_en = NOW() WHERE id = $2 AND usuario_id = $3 RETURNING *',
            [completada, id, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask, completeTask };
