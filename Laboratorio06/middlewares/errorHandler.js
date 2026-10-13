// middlewares/errorHandler.js

// 404 para rutas inexistentes
const notFound = (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
};

// Manejo global de errores: se reconoce por tener 4 parámetros (err, req, res, next)
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // JSON mal formado enviado por el cliente -> error del cliente (400)
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      status: 'fail',
      message: 'El cuerpo de la petición no es un JSON válido'
    });
  }

  console.error('Error no controlado:', err.message);
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
    detalle: err.message
  });
};

module.exports = { notFound, errorHandler };
