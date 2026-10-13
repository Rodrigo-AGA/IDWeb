# Laboratorio 06 – Cuestionario

## 1. ¿Qué es un Middleware en Express y cuál es el impacto de no invocar `next()`?
Un middleware es una función con acceso al objeto de solicitud (`req`), al de respuesta (`res`) y a la siguiente función de la cadena (`next`). Express procesa cada petición pasándola por una canalización de middlewares (patrón de cadena de responsabilidad): cada uno puede leer o modificar `req`/`res`, terminar el ciclo enviando una respuesta, o ceder el control con `next()`.

Si un middleware no llama a `next()` (ni envía una respuesta con `res.json()`, `res.send()`, etc.), la petición queda **colgada**: los middlewares y controladores siguientes nunca se ejecutan y el cliente espera hasta agotar el tiempo (timeout). Si se llama a `next(err)`, Express salta directamente al middleware de manejo de errores (el de 4 parámetros).

## 2. Diferencia entre `req.params`, `req.query` y `req.body`
| Objeto | Propósito semántico | Implementación / ejemplo |
|---|---|---|
| `req.params` | Identifica **qué recurso** se solicita; forma parte de la ruta. | `GET /api/cursos/:id` → `/api/cursos/3` → `req.params.id === '3'` |
| `req.query` | **Modifica la consulta** (filtros, orden, paginación); es opcional. | `GET /api/cursos?creditos=4` → `req.query.creditos === '4'` |
| `req.body` | **Datos a crear o actualizar**; viaja en el cuerpo de la petición (POST/PUT). | `{"nombre":"BD","codigo":"BDD301","creditos":3}`; requiere `express.json()` para poblarse |

Nota: `params` y `query` siempre llegan como *strings* (hay que convertirlos con `Number()`), mientras que `body` conserva los tipos del JSON.

## 3. ¿Por qué devolver códigos de estado HTTP semánticos y no siempre 200?
- **Contrato claro**: el código indica el resultado antes de leer el cuerpo (201 creado, 400 error del cliente, 404 no existe, 500 fallo del servidor).
- **Interoperabilidad**: clientes, navegadores, proxies, cachés y herramientas de monitoreo interpretan el código de forma estándar (por ejemplo, no cachean un 404/500 como si fuera un éxito).
- **Manejo de errores simple**: `fetch`, Axios o Postman distinguen éxito de fallo por el código (`response.ok`) sin parsear mensajes propios.
- **Depuración y observabilidad**: se distingue un error del cliente (4xx) de uno del servidor (5xx) en logs y métricas.
- **Cumplimiento del estándar REST**: responder siempre 200 oculta fallos y obliga a cada cliente a inventar su propio protocolo de errores.
