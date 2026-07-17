# ADR-001: Uso del patrón Page Object Model para la automatización UI

## Estado

Aceptado

## Contexto

La prueba técnica requiere automatizar diferentes funcionalidades de una aplicación de gestión de tareas utilizando Playwright. Los casos de prueba incluyen creación, edición, eliminación, filtrado y validación de tareas.

Si cada prueba interactuara directamente con los selectores de la interfaz, el código se volvería repetitivo, difícil de mantener y más propenso a fallos cuando cambie la UI.

Se necesitaba una estructura que permitiera reutilizar acciones comunes, reducir duplicidad y facilitar el mantenimiento de la suite de pruebas.

## Opciones consideradas

### Opción 1: Escribir toda la automatización directamente en los tests

- **Pros:**

  - Implementación rápida.
  - Menor cantidad de archivos.

- **Contras:**

  - Duplicación de código.
  - Selectores distribuidos en múltiples pruebas.
  - Alto costo de mantenimiento ante cambios en la interfaz.

### Opción 2: Implementar el patrón Page Object Model

- **Pros:**

  - Centraliza los selectores y las acciones de la interfaz.
  - Favorece la reutilización de código.
  - Facilita el mantenimiento de la suite de pruebas.
  - Hace que los tests sean más legibles y expresen el comportamiento del negocio.

- **Contras:**

  - Requiere crear una capa adicional de abstracción y desacoplamiento.
  - Incrementa ligeramente la cantidad de archivos del proyecto.

## Decisión

Se decidió implementar el patrón **Page Object Model (POM)**.

Cada página expone únicamente las acciones que un usuario puede realizar, mientras que los detalles de implementación y los selectores permanecen encapsulados dentro del Page Object.

Los casos de prueba únicamente describen el flujo funcional, por ejemplo crear una tarea, editarla o eliminarla, sin depender directamente de la estructura HTML de la aplicación.

Esta decisión mejora la mantenibilidad, favorece la reutilización y reduce el impacto de futuros cambios en la interfaz.

## Consecuencias

### Positivas

- Menor duplicación de código.
- Mejor separación entre la lógica del test y la implementación de la interfaz.
- Selectores centralizados en un único lugar.
- Mayor legibilidad de los casos de prueba.
- Facilita la incorporación de nuevos escenarios reutilizando los mismos métodos.

### Negativas (trade-offs aceptados)

- Mayor número de archivos.
- Requiere mantener sincronizados los Page Objects cuando evoluciona la aplicación.

### Riesgos

- Si el Page Object crece demasiado, puede convertirse en una clase con demasiadas responsabilidades.
- Un diseño inadecuado del Page Object puede ocultar demasiada lógica y dificultar la depuración de errores.
