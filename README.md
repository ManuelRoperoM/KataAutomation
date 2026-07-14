# Kata Técnica — Automatizador TI

## Contexto

Bienvenido/a a la prueba técnica para el cargo de **Automatizador TI**. Esta kata evalúa tus competencias reales en automatización de pruebas E2E con Playwright y TypeScript.

---

## Requisitos previos

- [Docker](https://docs.docker.com/get-docker/) y Docker Compose
- [Node.js](https://nodejs.org/) v20 o superior
- Git

---

## Configuración inicial

### 1. Levantar la aplicación bajo prueba

```bash
# Levantar la app y la base de datos
docker compose up -d

# Verificar que esté corriendo
curl http://localhost:3000/login
```

La primera vez, Docker construye la imagen y crea las tablas + datos de prueba automáticamente.

Para detener:

```bash
docker compose down
```

Para reiniciar con datos limpios:

```bash
docker compose down -v && docker compose up -d
```

### 2. Instalar dependencias del proyecto de tests

```bash
npm install
```

### 3. Instalar browsers de Playwright

```bash
npx playwright install
```

---

## Ejecución de tests

```bash
# Ejecutar todos los tests
npx playwright test

# Ejecutar un ejercicio específico
npx playwright test tests/exercise-1/

# Ver reporte
npx playwright show-report
```

---

## ¿Qué recibes?

- Un proyecto Playwright pre-configurado con TypeScript
- Una aplicación (gestor de tareas - ToDo) corriendo en `http://localhost:3000`
- 3 ejercicios obligatorios
- Base de datos PostgreSQL con el esquema de la app

## Aplicación bajo prueba

La app es un gestor de tareas (ToDo) con las siguientes funcionalidades:

- Login con email/contraseña
- Crear, editar y eliminar tareas
- Filtrar tareas por estado: Todas, Activas, Completadas
- API REST en `/api/todos` (CRUD completo)

### Credenciales de prueba

| Email | Contraseña | Rol |
|-------|------------|-----|
| `user@test.com` | `Test1234!` | Usuario estándar |

### Base de datos

PostgreSQL accesible en `localhost:5432`, base `tododb`, usuario `testuser`, contraseña en variable de entorno `DB_PASSWORD`.

Tabla principal:
```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Ejercicios

### Ejercicio 1: Debugging (45 min estimado)

En la carpeta `tests/exercise-1/` encontrarás **3 tests que fallan intermitentemente**. Tu tarea:

1. Ejecutar cada test e identificar la causa raíz del fallo
2. Corregir cada test para que sea estable y confiable
3. Agregar un comentario breve en cada archivo explicando qué causaba el fallo

> ⚠️ Los tests fallan por razones sutiles de diseño, no por errores de sintaxis.

### Ejercicio 2: Implementación con patrones (90 min estimado)

En `tests/exercise-2/` implementa un flujo E2E completo del CRUD de tareas usando:

- **Page Object Model** — encapsula la interacción con la UI
- **Fixtures de Playwright** — configura contexto reutilizable
- **Data Builders** — genera datos de prueba dinámicos

Lee el `README.md` dentro de la carpeta para los requisitos específicos.

**Reglas:**
- NO uses selectores CSS acoplados a la implementación (`.MuiButton-root`, `div > span:nth-child(2)`)
- Usa `data-testid`, roles ARIA (`getByRole`), o texto visible (`getByText`)
- Los Page Objects deben tener responsabilidad única (no "God Objects")

### Ejercicio 3: Base de datos + API (60 min estimado)

En `tests/exercise-3/` debes:

1. Escribir un test que cree una tarea vía API y verifique que aparece en la UI
2. Escribir un test que complete una tarea en la UI y verifique el cambio en la DB
3. Implementar setup y teardown que limpien datos de forma idempotente

Lee el `README.md` dentro de la carpeta para los requisitos específicos.

---

## ADR Obligatorio

Debes documentar **una decisión de diseño** en formato ADR (Architecture Decision Record). Usa la plantilla en `docs/ADR-template.md`.

Ejemplos de decisiones que puedes documentar:
- Estrategia de selectores elegida
- Patrón de limpieza de datos
- Estructura de Page Objects
- Manejo de datos de prueba

---

## Reglas

1. **Tiempo máximo:** 8 horas. Se evalúa desde el primer hasta el último commit.
2. **Git:** Usa commits atómicos con mensajes descriptivos. Se evalúa tu flujo de trabajo.
3. **Código limpio:** Naming consistente, funciones pequeñas, sin código muerto.
4. **TypeScript estricto:** Tipado completo, no uses `any`.
5. **IA permitida:** Puedes usar herramientas de IA como asistente, pero debes comprender y poder defender todo tu código en la entrevista oral.

---

## Entrega

1. Sube tu solución a un repositorio Git (GitHub)
2. Asegúrate de que los tests pasan localmente
3. Incluye instrucciones de ejecución si agregaste algo extra
4. Envía el enlace del repositorio

---

## Entrevista de sustentación (30 min)

Después de la entrega, tendrás una entrevista corta donde:

- Explicarás tus decisiones de diseño
- Caminaremos por tu código juntos
- Te haremos preguntas sobre por qué elegiste cierta solución
- Discutiremos escenarios de escalabilidad

> 💡 No hay respuestas "correctas" únicas — evaluamos tu razonamiento y comprensión.

---

¡Buena suerte! 🚀
