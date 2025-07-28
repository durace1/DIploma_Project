import { uiTest as test } from '../../src/helpers/fixtures/ui2.fixtures';
import { UserBuilder } from '../../src/helpers/builders/index';
import { expect } from '@playwright/test'

test.describe('User tests', () => {
test.only ('Возможность логаута пользователя',{
    tag: ['@USER'],}, async ({ getAuth })=> {
        const user = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();
    const app = await getAuth.user(user);
    //Логаутимся
    await app.settings.clickLogoutButton();
    await expect(app.main.logoutLoginButton).toBeVisible();
})
test.only ('Смена пароля у пользователя',{
    tag: ['@USER'],}, async ({getAuth})=> {
        const user = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();
    const app = await getAuth.user(user);
    // Пароль для проверки
    const newPassword = new UserBuilder().addPassword().generate().password;
    //Идем в настройки менять пароль
    await app.settings.open();
    await app.settings.changePassword({password: newPassword});
    await expect(app.settings.updateSettingsButton).toBeHidden()

    //Выходим
    await app.settings.clickLogoutButton();

    //Пробуем зайти со старым паролем
    await app.main.gotoLogin();
    await app.register.login({
        email: user.email,
        password: user.password
    });
    await expect(app.register.errorMessage).toContainText('Wrong email/password combination');
})
})