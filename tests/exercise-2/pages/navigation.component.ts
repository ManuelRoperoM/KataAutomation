import { Page, expect } from "@playwright/test";

export class NavigationComponent {

    constructor(private readonly page: Page) {}

    async goToTodos(): Promise<void> {
        await this.page.getByTestId('nav-todos').click();
        await expect(this.page).toHaveURL('/todos');
      }
    
      async goToDashboard(): Promise<void> {
        await this.page.getByTestId('/dashboard').click();
        await expect(this.page).toHaveURL(/\/dashboard$/);
      }
    
      async logout(): Promise<void> {
        await this.page.getByRole('button', { name: 'Cerrar sesión' }).click();
        await expect(this.page).toHaveURL('/login');
      }
}