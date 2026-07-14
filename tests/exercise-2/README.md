# Ejercicio 2 — Implementación con patrones

## Objetivo

Implementa un flujo E2E completo del CRUD de tareas (crear, leer, actualizar, eliminar) usando los siguientes patrones:

## Requisitos técnicos

### 1. Page Object Model

Crea Page Objects para cada página involucrada:
- `LoginPage` — encapsula el formulario de login
- `TodoListPage` — encapsula la lista de tareas y sus acciones
- `NavigationComponent` — encapsula la navegación entre páginas

**Reglas:**
- Cada Page Object debe tener **responsabilidad única**
- Los métodos deben representar **acciones del usuario**, no operaciones técnicas
- Los locators deben usar `data-testid`, roles ARIA, o texto visible
- **PROHIBIDO:** `.MuiButton-root`, `div > span:nth-child(2)`, selectores CSS de implementación

### 2. Fixtures de Playwright

Crea fixtures personalizados que provean:
- Un usuario autenticado (que ya pasó por el login)
- Una página con datos precargados (al menos 3 tareas existentes)

### 3. Data Builders

Implementa un builder para generar datos de prueba dinámicos:
- `TodoBuilder` — genera títulos únicos, estados variados
- Los datos deben ser **no deterministas** (únicos por ejecución)

## Tests a implementar

1. **Crear tarea:** Verificar que una tarea nueva aparece en la lista
2. **Marcar como completada:** Verificar que el estado cambia visualmente
3. **Editar título:** Verificar que el nuevo título se muestra
4. **Eliminar tarea:** Verificar que desaparece de la lista
5. **Filtrar tareas:** Verificar que los filtros muestran/ocultan las tareas correctas

## Estructura esperada

```
tests/exercise-2/
├── pages/
│   ├── login.page.ts
│   ├── todo-list.page.ts
│   └── navigation.component.ts
├── fixtures/
│   └── todo.fixture.ts
├── builders/
│   └── todo.builder.ts
└── todo-crud.spec.ts
```

## Criterios de evaluación

- [ ] Page Objects con responsabilidad única
- [ ] Selectores resilientes (no acoplados a CSS framework)
- [ ] Fixtures que simplifican el setup de tests
- [ ] Data builders que generan datos únicos
- [ ] Tests legibles e independientes entre sí
- [ ] Naming consistente y descriptivo
