import { test, expect } from '@playwright/test';

// Test: Verify that a user can log in and is redirected to the dashboard
test('user can login with valid credentials', async ({ page }) => {
  await page.goto('/login');

  // Fill in the login form
  await page.locator('#email').fill('user@test.com');
  await page.locator('#password').fill('Test1234!');

  // Submit the form
  await page.locator('button[type="submit"]').click();

  // Verify redirect to dashboard
  // expect(page.url()).toContain('/dashboard');

  /* 
    Causa del error:
    Se hacia la validacion del contenido de la URL antes de que el front 
    la refrescara
    Solucion:
    Usar promesas y cambiar to contain por to have url, esto
    garantiza que cargue completamente la pagina antes de validar la url
  */
  await expect(page).toHaveURL('/dashboard');

  // Verify welcome message is displayed
  const welcomeMessage = page.locator('[data-testid="welcome-message"]');
  await expect(welcomeMessage).toBeVisible();
});

// Credenciales invalidas
test('user sees error with invalid credentials', async ({ page }) => {
  await page.goto('/login');

  await page.locator('#email').fill('wrong@test.com');
  await page.locator('#password').fill('WrongPass!');

  await page.locator('button[type="submit"]').click();

  // Verify error is shown
  const errorAlert = page.locator('[data-testid="login-error"]');
  await expect(errorAlert).toBeVisible();
  // await expect(errorAlert).toContainText('credenciales');
  /*
  Causa del error:
  El test esperaba especificamene el mensaje de crendenciales
  el mensjae de error en el front es Credenciales inválidas
  */
  await expect(errorAlert).toContainText('Credenciales inválidas');
});
