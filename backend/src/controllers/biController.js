const db = require('../database/db');

const queries = {
  userParticipationAnalysis: `
    WITH user_tasks_last_30_days AS (
        SELECT
            u.id AS user_id,
            COUNT(t.id) AS task_count
        FROM fracttaldb.usuarios u
        LEFT JOIN fracttaldb.tareas t ON u.id = t.usuario_id
        WHERE t.creado_en >= NOW() - INTERVAL '30 days'
        GROUP BY u.id
    ),
    user_tasks_prev_30_days AS (
        SELECT
            u.id AS user_id,
            COUNT(t.id) AS task_count
        FROM fracttaldb.usuarios u
        LEFT JOIN fracttaldb.tareas t ON u.id = t.usuario_id
        WHERE t.creado_en >= NOW() - INTERVAL '60 days' AND t.creado_en < NOW() - INTERVAL '30 days'
        GROUP BY u.id
    )
    SELECT
        (SELECT AVG(task_count) FROM user_tasks_last_30_days) AS avg_tasks_last_30_days,
        (SELECT AVG(task_count) FROM user_tasks_prev_30_days) AS avg_tasks_prev_30_days;
  `,
  completionRateTrends: `
    SELECT
        DATE(creado_en) AS completion_date,
        prioridad,
        COUNT(*) AS total_tasks,
        SUM(CASE WHEN completada THEN 1 ELSE 0 END) AS completed_tasks,
        (SUM(CASE WHEN completada THEN 1 ELSE 0 END)::float / COUNT(*)) * 100 AS completion_rate
    FROM fracttaldb.tareas
    WHERE creado_en >= NOW() - INTERVAL '90 days'
    GROUP BY completion_date, prioridad
    ORDER BY completion_date, prioridad;
  `,
  categoryPerformance: `
    WITH category_performance AS (
        SELECT
            c.nombre AS category_name,
            COUNT(t.id) AS total_tasks,
            SUM(CASE WHEN t.completada THEN 1 ELSE 0 END) AS completed_tasks,
            (SUM(CASE WHEN t.completada THEN 1 ELSE 0 END)::float / COUNT(t.id)) * 100 AS completion_rate,
            AVG(t.actualizado_en - t.creado_en) AS avg_completion_time
        FROM fracttaldb.categorias c
        JOIN fracttaldb.tareas t ON c.id = t.categoria_id
        GROUP BY c.nombre
    )
    SELECT * FROM category_performance
    ORDER BY completion_rate DESC;
  `,
  userProductivityPatterns: `
    SELECT
        EXTRACT(DOW FROM creado_en) AS day_of_week,
        EXTRACT(HOUR FROM creado_en) AS hour_of_day,
        COUNT(*) AS tasks_created
    FROM fracttaldb.tareas
    GROUP BY day_of_week, hour_of_day
    ORDER BY tasks_created DESC;
  `,
  overdueTaskAnalysis: `
    SELECT
        u.nombre AS user_name,
        c.nombre AS category_name,
        COUNT(t.id) AS overdue_tasks,
        AVG(NOW()::date - t.fecha_vencimiento) AS avg_days_overdue
    FROM fracttaldb.tareas t
    JOIN fracttaldb.usuarios u ON t.usuario_id = u.id
    JOIN fracttaldb.categorias c ON t.categoria_id = c.id
    WHERE t.completada = FALSE AND t.fecha_vencimiento < NOW()::date
    GROUP BY u.nombre, c.nombre
    ORDER BY overdue_tasks DESC;
  `,
  tagUsageStatistics: `
    WITH tag_usage AS (
        SELECT
            e.nombre AS tag_name,
            COUNT(te.tarea_id) AS usage_count
        FROM fracttaldb.etiquetas e
        JOIN fracttaldb.tarea_etiquetas te ON e.id = te.etiqueta_id
        GROUP BY e.nombre
        ORDER BY usage_count DESC
    ),
    tag_completion AS (
        SELECT
            e.nombre AS tag_name,
            (SUM(CASE WHEN t.completada THEN 1 ELSE 0 END)::float / COUNT(t.id)) * 100 AS completion_rate
        FROM fracttaldb.etiquetas e
        JOIN fracttaldb.tarea_etiquetas te ON e.id = te.etiqueta_id
        JOIN fracttaldb.tareas t ON te.tarea_id = t.id
        GROUP BY e.nombre
    )
    SELECT
        tu.tag_name,
        tu.usage_count,
        tc.completion_rate
    FROM tag_usage tu
    JOIN tag_completion tc ON tu.tag_name = tc.tag_name
    ORDER BY tu.usage_count DESC;
  `,
  userRetentionMetrics: `
    WITH weekly_active_users AS (
        SELECT
            DISTINCT usuario_id,
            EXTRACT(WEEK FROM creado_en) AS week_number
        FROM fracttaldb.tareas
        WHERE creado_en >= NOW() - INTERVAL '4 weeks'
    )
    SELECT
        w1.week_number,
        COUNT(w1.usuario_id) AS active_users,
        (COUNT(w2.usuario_id)::float / COUNT(w1.usuario_id)) * 100 AS retention_rate
    FROM weekly_active_users w1
    LEFT JOIN weekly_active_users w2 ON w1.usuario_id = w2.usuario_id AND w1.week_number = w2.week_number - 1
    GROUP BY w1.week_number
    ORDER BY w1.week_number;
  `,
  priorityDistributionAnalysis: `
    SELECT
        prioridad,
        COUNT(*) AS task_count
    FROM fracttaldb.tareas
    WHERE usuario_id IN (
        SELECT id FROM fracttaldb.usuarios WHERE creado_en >= NOW() - INTERVAL '7 days'
    )
    GROUP BY prioridad
    ORDER BY prioridad;
  `,
  seasonalTrends: `
    SELECT
        TO_CHAR(creado_en, 'YYYY-MM') AS month,
        COUNT(*) AS tasks_created,
        SUM(CASE WHEN completada THEN 1 ELSE 0 END) AS tasks_completed
    FROM fracttaldb.tareas
    WHERE creado_en >= NOW() - INTERVAL '1 year'
    GROUP BY month
    ORDER BY month;
  `,
  performanceBenchmarking: `
    WITH user_completion_rates AS (
        SELECT
            usuario_id,
            (SUM(CASE WHEN completada THEN 1 ELSE 0 END)::float / COUNT(id)) * 100 AS completion_rate,
            NTILE(10) OVER (ORDER BY (SUM(CASE WHEN completada THEN 1 ELSE 0 END)::float / COUNT(id)) DESC) as percentile
        FROM fracttaldb.tareas
        GROUP BY usuario_id
    ),
    user_concurrent_tasks AS (
        SELECT
            usuario_id,
            COUNT(*) as concurrent_tasks
        FROM fracttaldb.tareas
        WHERE completada = FALSE
        GROUP BY usuario_id
    )
    SELECT
        u.nombre,
        ucr.completion_rate,
        uct.concurrent_tasks
    FROM user_completion_rates ucr
    JOIN fracttaldb.usuarios u ON ucr.usuario_id = u.id
    LEFT JOIN user_concurrent_tasks uct ON ucr.usuario_id = uct.usuario_id
    WHERE ucr.percentile = 1;
  `
};

const getBIQuery = async (req, res) => {
  const { queryName } = req.params;
  const query = queries[queryName];

  if (!query) {
    return res.status(404).json({ error: 'Query not found' });
  }

  try {
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const allowedModels = ['tareas', 'usuarios', 'categorias', 'etiquetas'];
const allowedDimensions = ['prioridad', 'completada', 'usuario_id', 'categoria_id', 'fecha_vencimiento', 'creado_en'];
const allowedMeasures = ['COUNT(*)', 'AVG(id)']; // Example, expand as needed

const postBIQuery = async (req, res) => {
  const { model, dimensions, measures, filters } = req.body;

  if (!model || !allowedModels.includes(model)) {
    return res.status(400).json({ error: 'Invalid model' });
  }

  const selectClause = [...dimensions, ...measures].join(', ');
  if (dimensions.some(d => !allowedDimensions.includes(d.split('.')[0]))) {
      return res.status(400).json({ error: 'Invalid dimensions' });
  }
  if (measures.some(m => !allowedMeasures.includes(m))) {
      return res.status(400).json({ error: 'Invalid measures' });
  }


  let whereClause = '';
  const queryParams = [];
  if (filters && filters.length > 0) {
    const filterClauses = filters.map((filter, index) => {
      if (!allowedDimensions.includes(filter.dimension)) {
          throw new Error('Invalid filter dimension');
      }
      queryParams.push(filter.value);
      return `${filter.dimension} ${filter.operator} $${index + 1}`;
    });
    whereClause = `WHERE ${filterClauses.join(' AND ')}`;
  }

  const groupByClause = dimensions.length > 0 ? `GROUP BY ${dimensions.join(', ')}` : '';

  const query = `SELECT ${selectClause} FROM fracttaldb.${model} ${whereClause} ${groupByClause};`;

  try {
    const { rows } = await db.query(query, queryParams);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getBIQuery,
  postBIQuery,
};
