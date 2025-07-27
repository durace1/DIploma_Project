import { test as base } from '@playwright/test';
import { App } from '../../pages/app.page';

export const uiTest = base.extend({
    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },

    getAuth: async ({ app }, use) => {
        // Фикстура для работы с пользователем
        const userFixture = {
            user: async (randomUser) => {
                await app.main.open();
                await app.main.goToSignup();
                await app.register.signup(randomUser);
                return app;
            },
        };
        await use(userFixture);
    },
});
