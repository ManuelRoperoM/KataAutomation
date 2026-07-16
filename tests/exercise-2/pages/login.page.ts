import { expect,Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.locator('#email').fill(email);
    await this.page.locator('#password').fill(password);

    await this.page.getByRole('button', { name: 'Iniciar sesión' }).click();
  }

  async expectLoginError(message: string): Promise<void> {
    await expect(this.page.getByTestId('login-error'))
      .toContainText(message);
  }
}