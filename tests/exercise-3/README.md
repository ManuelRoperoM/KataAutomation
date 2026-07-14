# Ejercicio 3 — Base de datos + API

## Objetivo

Escribir tests que integren la UI, la API REST y la base de datos PostgreSQL.

## Contexto técnico

### API REST

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/todos` | Lista todas las tareas del usuario |
| POST | `/api/todos` | Crea una tarea nueva |
| PUT | `/api/todos/:id` | Actualiza una tarea |
| DELETE | `/api/todos/:id` | Elimina una tarea |

**Headers requeridos:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

El token se obtiene del endpoint `POST /api/auth/login` con body `{ email, password }`.

### Base de datos

PostgreSQL en `localhost:5432`, base `tododb`, usuario `testuser`.

```sql
-- Tabla de tareas
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100)
);
```

## Tests a implementar

### Test 1: API → UI
1. Crear una tarea vía `POST /api/todos`
2. Navegar a la lista de tareas en la UI
3. Verificar que la tarea creada por API aparece en la interfaz

### Test 2: UI → DB
1. Completar una tarea en la UI (marcar checkbox)
2. Consultar la base de datos directamente
3. Verificar que el campo `completed` es `true` en la tabla `todos`

### Test 3: Setup y Teardown idempotente
1. Implementar un `beforeEach` que cree datos necesarios para los tests
2. Implementar un `afterEach` que limpie **solo los datos creados por el test**
3. La limpieza debe ser **idempotente** (ejecutar varias veces no causa error)

## Archivo proporcionado

Se te entrega `db-helper.ts` con la estructura base de conexión. Complétalo con:
- Función para consultar tareas por título
- Función para verificar el estado `completed` de una tarea
- Función de limpieza que elimine tareas por un identificador único

## Criterios de evaluación

- [ ] Conexión a DB correcta usando variables de entorno
- [ ] Queries parametrizadas (nunca concatenar strings)
- [ ] Teardown idempotente que no rompe otros tests
- [ ] Uso correcto de la API REST con autenticación
- [ ] Tests independientes que no dependen del orden de ejecución
