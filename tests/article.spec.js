
import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builders/user.builder';
import { App } from '../src/pages/app.page'
import { ArticleBuilder } from '../src/helpers/builders/article.builder';

test.describe('Article tests', () => {
test ('Создание статьи',{
    tag: ['@ARTICLE'],}, async ({page})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();

    //Регистрируемся
        let app = new App(page);
        await app.main.open();
        await app.main.goToSignup();
        await app.register.signup(randomUser);
        await expect(app.main.profileNameField).toContainText(randomUser.username);

    //Генерим статью
    const randomArticle = new ArticleBuilder()
        .generateArticleTitle()
        .generateArticleInfo()
        .generateArticleContent()
        .generateArticleTag()
        .generate();

    //Создаем статью
    await app.newArticle.open();
    await app.newArticle.newArticle(randomArticle);
    await expect(page.getByRole('button', { name: '  Edit Article' }).first()).toBeVisible();
})

test ('Поставить лайк статье',{
    tag: ['@ARTICLE'],}, async ({page})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();

    //Регистрируемся
        let app = new App(page);
        await app.main.open();
        await app.main.goToSignup();
        await app.register.signup(randomUser);
        await expect(app.main.profileNameField).toContainText(randomUser.username);

    //Генерим статью
    const randomArticle = new ArticleBuilder()
        .generateArticleTitle()
        .generateArticleInfo()
        .generateArticleContent()
        .generateArticleTag()
        .generate();

    //Создаем статью
    await app.newArticle.open();
    await app.newArticle.newArticle(randomArticle);
    await expect(page.getByRole('button', { name: '  Edit Article' }).first()).toBeVisible();

    //Поставим лайк статье
    await app.main.open();
    await app.globalFeed.open();
    await app.globalFeed.likeArticle();
    await expect(page.getByRole('button', { name: '  ( 1 )' })).toBeVisible();
})

test ('Отфильтровать статью по тегу из списка',{
    tag: ['@ARTICLE'],}, async ({page})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();

    //Регистрируемся
    let app = new App(page);
    await app.main.open();
    await app.main.goToSignup();
    await app.register.signup(randomUser);
    await expect(app.main.profileNameField).toContainText(randomUser.username);

    //Фильтруемся по тегу справа
    const tagName = await app.main.firstTag.textContent();
    await app.main.tagFiltering();
    await expect(app.main.firstArticleTag).toContainText(tagName)
})
})