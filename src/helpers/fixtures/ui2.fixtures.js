import { test as base } from '@playwright/test';
import { App } from '../../pages/app.page';

export const uiTest = base.extend({
/*
    authUser: async ({ page }, use) => {
        const app = new App(page);
        await app.main.open();
        await app.main.goToSignup();
        await app.register.signup(user);
        await use(authUser);
    },
    */
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

    /*
    getAuth: async ({ page }, use) => {
		// Фикстура для работы с пользователем
		const userFixture = {
			user: async (randomUser) => {
				let app = new App(page);
				await app.main.open();
				await app.main.gotoLogin();
				await app.register.signup(randomUser);
				await use(app);
			},
		};
		await use(userFixture);
	},
    */
});

/*
import { test as base } from '@playwright/test';
import { App } from '../../pages/app.page';
import { UserBuilder } from '../builders';
export { expect } from '@playwright/test';

export const test = base.extend({
	user: async ({ page }, use) => {
		// Фикстура для работы с пользователем
		const userFixture = {
			authUser: async (randomUser) => {
				let app = new App(page);
				await app.main.open();
				await app.main.gotoLogin();
				await app.register.signup(randomUser);
				await use(app);
			},
		};

		await use(userFixture);
	},
});
*/