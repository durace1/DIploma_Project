import { uiTest as test, expect } from '../../src/helpers/fixtures/ui2.fixtures';
import { UserBuilder } from '../../src/helpers/builders/index';

test.describe('User tests', () => {
test.only ('Возможность логаута пользователя',{
    tag: ['@USER'],}, async ({ getAuth })=> {
        const user = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();
    const app = getAuth.user(user);
    //Логаутимся
    await app.settings.clickLogoutButton();
    await expect(app.main.logoutLoginButton).toBeVisible();
})
})