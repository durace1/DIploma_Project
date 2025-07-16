import { test as base } from '@playwright/test';
import { App } from '../../pages/app.page';
export { expect } from '@playwright/test';

export const uiTest = base.extend({
    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },
});

