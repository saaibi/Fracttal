const express = require('express');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3000;
const rateLimit = require('express-rate-limit');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000, 
  standardHeaders: true, 
  legacyHeaders: false, 
});

app.use(limiter);

const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');
const categoriesRoutes = require('./routes/categories');
const tagsRoutes = require('./routes/tags');
const healthRoutes = require('./routes/health');
const biRoutes = require('./routes/bi');

// Configure CORS
app.use(cors({
  origin:  process.env.ALLOWED_ORIGINS, 
  credentials: true, 
}));

app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tareas', tasksRoutes);
app.use('/api/categorias', categoriesRoutes);
app.use('/api/etiquetas', tagsRoutes);
app.use('/api/bi', biRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});