// app.js
const express = require('express');
const cursoRoutes = require('./routes/cursoRoutes');
const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares globales
app.use(express.json()); // Middleware incorporado: parsea JSON del body
app.use(logger);         // Middleware personalizado de auditoría

// 2. Rutas
app.use('/api/cursos', cursoRoutes);

// Ruta de prueba para demostrar el manejador de errores (devuelve 500)
app.get('/api/error-test', () => {
  throw new Error('Error de prueba provocado intencionalmente');
});

// 3. Rutas inexistentes y manejo global de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`API de Cursos escuchando en http://localhost:${PORT}`));
