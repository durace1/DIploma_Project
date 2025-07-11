
import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builders/user.builder';
import { App } from '../src/pages/app.page'

test.describe('User tests', () => {
test ('Возможность логаута пользователя',{
    tag: ['@USER'],}, async ({page})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();

    let app = new App(page);
    //Регистрируемся
    await app.main.open();
    await app.main.goToSignup();
    await app.register.signup(randomUser);
    await expect(app.main.profileNameField).toContainText(randomUser.username);

    //Логаутимся
    await app.settings.clickLogoutButton();
    await expect(page.getByRole('link', { name: ' Login' })).toBeVisible();
})

test ('Смена пароля у пользователя',{
    tag: ['@USER'],}, async ({page})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();
    // Пароль для проверки
    const newPassword = new UserBuilder().addPassword().generate().password;

    let app = new App(page);
    //Регистрируемся
    await app.main.open();
    await app.main.goToSignup();
    await app.register.signup(randomUser);
    await expect(app.main.profileNameField).toContainText(randomUser.username);

    //Идем в настройки менять пароль
    await app.settings.open();
    await app.settings.changePassword({password: newPassword});
    await expect(app.settings.updateSettingsButton).toBeHidden()

    //Выходим
    await app.settings.clickLogoutButton();

    //Пробуем зайти со старым паролем
    await app.main.gotoLogin();
    await app.register.login(randomUser);
    await expect(page.getByRole('main')).toContainText('Wrong email/password combination');
})
})