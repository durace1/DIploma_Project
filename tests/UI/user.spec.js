
import { uiTest as test, expect } from '../../src/helpers/fixtures';
import { UserBuilder } from '../../src/helpers/builders/index';
//import { App } from '../src/pages/app.page'

test.describe('User tests', () => {
test ('Возможность логаута пользователя',{
    tag: ['@USER'],}, async ({page, app})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();

    //let app = new App(page);
    //Регистрируемся
    await app.main.open();
    await app.main.goToSignup();
    await app.register.signup(randomUser);
    await expect(app.main.profileNameField).toContainText(randomUser.username);

    //Логаутимся
    await app.settings.clickLogoutButton();
    await expect(app.main.logoutLoginButton).toBeVisible();
})

test ('Смена пароля у пользователя',{
    tag: ['@USER'],}, async ({page, app})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();
    // Пароль для проверки
    const newPassword = new UserBuilder().addPassword().generate().password;

    //let app = new App(page);
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
    await expect(app.register.errorMessage).toContainText('Wrong email/password combination');
})
})