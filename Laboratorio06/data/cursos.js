// data/cursos.js
// Capa de persistencia temporal (en memoria).
const cursos = [
  { id: 1, nombre: 'Introducción al Desarrollo Web', codigo: 'IDW101', creditos: 4 },
  { id: 2, nombre: 'Estructuras de Datos', codigo: 'EDA201', creditos: 4 },
  { id: 3, nombre: 'Bases de Datos', codigo: 'BDD301', creditos: 3 },
  { id: 4, nombre: 'Ingeniería de Software', codigo: 'ISW401', creditos: 3 }
];

// Contador independiente para que los ids no se repitan tras un DELETE
let siguienteId = cursos.length + 1;

const generarId = () => siguienteId++;

module.exports = { cursos, generarId };
