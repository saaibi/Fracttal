const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');
const categoriesRoutes = require('./routes/categories');
const tagsRoutes = require('./routes/tags');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/tareas', tasksRoutes);
app.use('/api/categorias', categoriesRoutes);
app.use('/api/etiquetas', tagsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});