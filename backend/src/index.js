const express = require('express');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');
const categoriesRoutes = require('./routes/categories');
const tagsRoutes = require('./routes/tags');

// Configure CORS
app.use(cors({
  origin: 'http://localhost:8070', 
  credentials: true, 
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tareas', tasksRoutes);
app.use('/api/categorias', categoriesRoutes);
app.use('/api/etiquetas', tagsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});