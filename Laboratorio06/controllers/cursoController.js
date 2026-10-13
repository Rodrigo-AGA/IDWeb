// controllers/cursoController.js
// Lógica de negocio del recurso "Cursos".
const { cursos, generarId } = require('../data/cursos');

const esNumeroValido = (valor) =>
  valor !== '' && valor !== null && !Number.isNaN(Number(valor)) && Number(valor) > 0;

// GET /api/cursos  (admite ?creditos=4 y ?nombre=web)
exports.getAllCursos = (req, res) => {
  const { creditos, nombre } = req.query;
  let resultado = [...cursos];

  if (creditos !== undefined) {
    resultado = resultado.filter((c) => c.creditos === Number(creditos));
  }
  if (nombre !== undefined) {
    resultado = resultado.filter((c) =>
      c.nombre.toLowerCase().includes(String(nombre).toLowerCase())
    );
  }

  res.status(200).json({ status: 'success', results: resultado.length, data: resultado });
};

// GET /api/cursos/:id
exports.getCursoById = (req, res) => {
  const id = Number(req.params.id);
  const curso = cursos.find((c) => c.id === id);

  if (!curso) {
    return res.status(404).json({ status: 'fail', message: `No existe un curso con id ${req.params.id}` });
  }
  res.status(200).json({ status: 'success', data: curso });
};

// POST /api/cursos
exports.createCurso = (req, res) => {
  const { nombre, codigo, creditos } = req.body || {};

  if (!nombre || !codigo || creditos === undefined || creditos === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Faltan campos obligatorios: nombre, codigo, creditos'
    });
  }
  if (!esNumeroValido(creditos)) {
    return res.status(400).json({ status: 'fail', message: 'creditos debe ser un número mayor a 0' });
  }
  if (cursos.some((c) => c.codigo.toLowerCase() === String(codigo).toLowerCase())) {
    return res.status(409).json({ status: 'fail', message: `Ya existe un curso con el código ${codigo}` });
  }

  const nuevoCurso = { id: generarId(), nombre, codigo, creditos: Number(creditos) };
  cursos.push(nuevoCurso);

  res.status(201).json({ status: 'success', data: nuevoCurso });
};

// PUT /api/cursos/:id
exports.updateCurso = (req, res) => {
  const id = Number(req.params.id);
  const curso = cursos.find((c) => c.id === id);

  if (!curso) {
    return res.status(404).json({ status: 'fail', message: `No existe un curso con id ${req.params.id}` });
  }

  const { nombre, codigo, creditos } = req.body || {};

  if (creditos !== undefined && !esNumeroValido(creditos)) {
    return res.status(400).json({ status: 'fail', message: 'creditos debe ser un número mayor a 0' });
  }
  if (
    codigo !== undefined &&
    cursos.some((c) => c.id !== id && c.codigo.toLowerCase() === String(codigo).toLowerCase())
  ) {
    return res.status(409).json({ status: 'fail', message: `Ya existe un curso con el código ${codigo}` });
  }

  if (nombre !== undefined) curso.nombre = nombre;
  if (codigo !== undefined) curso.codigo = codigo;
  if (creditos !== undefined) curso.creditos = Number(creditos);

  res.status(200).json({ status: 'success', data: curso });
};

// DELETE /api/cursos/:id
exports.deleteCurso = (req, res) => {
  const id = Number(req.params.id);
  const indice = cursos.findIndex((c) => c.id === id);

  if (indice === -1) {
    return res.status(404).json({ status: 'fail', message: `No existe un curso con id ${req.params.id}` });
  }

  cursos.splice(indice, 1);
  res.status(200).json({ status: 'success', message: `Curso ${id} eliminado correctamente` });
};
