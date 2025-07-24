import { test as base } from '@playwright/test';
import { App } from '../../pages/app.page';
import { UserBuilder } from '../builders';
export { expect } from '@playwright/test';

export const uiTest = base.extend({
    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },

    authUser: async ({ app }, use) => {
        //Генерим пользователя
        const user = new UserBuilder()
          .addEmail()
          .addPassword()
          .addUsername()
          .generate();
        await app.main.open();
        await app.main.goToSignup();
        await app.register.signup(user);
        await use(user);
    },
});

