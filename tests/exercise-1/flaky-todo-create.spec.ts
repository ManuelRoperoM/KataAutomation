import { test, expect } from '@playwright/test';

const TEST_TODO_TITLE_1 = 'Comprar Leche';
const TEST_TODO_TITLE_2 = 'Comprar Pan';

// Test: Verify that a user can create a new todo
test('user can create a new todo item', async ({ page }) => {
  // Login first
  await page.goto('/login');
  await page.locator('#email').fill('user@test.com');
  await page.locator('#password').fill('Test1234!');
  await page.locator('button[type="submit"]').click();
  await page.waitForURL('/dashboard');

  // Navigate to the todo list
  await page.locator('[data-testid="nav-todos"]').click();
  await page.waitForURL('/todos');

  // Create a new todo
  const UNIQUE_TITLE_TODO = TEST_TODO_TITLE_1 + crypto.randomUUID(); // Titulo unico por ejecucion
  await page.locator('[data-testid="todo-input"]').fill(UNIQUE_TITLE_TODO);
  await page.locator('[data-testid="add-todo-button"]').click();

  // Wait for the todo to appear in the list
  await page.waitForSelector('[data-testid="todo-list"]');

  // Verify the todo was created by counting items with that title
  // const todoItems = page.locator('[data-testid="todo-item"]', {
  //   hasText: TEST_TODO_TITLE_1,
  // });
  // const count = await todoItems.count();
  // expect(count).toBe(1);


  /*
  Causa del error: 
  El error ocurre cuando se ejecuta mas de una vez el test, 
  esto crea varios elementos en el tod ocon el titulo de la constante Comprar Leche
  en el test se espera que solo exista una vez este nombre originando el error.
  Solucion:
  Decido concatenar el titulo del todo con un id unico garantizando
  que siempre en la ejecucion del test se valide un nuevo valor
  */
  const todoItems = page.locator('[data-testid="todo-item"]', {
    hasText: UNIQUE_TITLE_TODO,
  });
  const count = await todoItems.count();
  expect(count).toBe(1);


});

test('created todo appears with uncompleted state', async ({ page }) => {
  /*
  No se encontro falla en este test
  */
  await page.goto('/login');
  await page.locator('#email').fill('user@test.com');
  await page.locator('#password').fill('Test1234!');
  await page.locator('button[type="submit"]').click();
  await page.waitForURL('/dashboard');

  await page.locator('[data-testid="nav-todos"]').click();
  await page.waitForURL('/todos');

  // Create a todo with the same hardcoded title
  await page.locator('[data-testid="todo-input"]').fill(TEST_TODO_TITLE_2);
  await page.locator('[data-testid="add-todo-button"]').click();

  // Find the todo and check its checkbox is unchecked
  const todoCheckbox = page.locator('[data-testid="todo-item"]', {
    hasText: TEST_TODO_TITLE_2,
  }).locator('input[type="checkbox"]');

  await expect(todoCheckbox.first()).not.toBeChecked();
});
