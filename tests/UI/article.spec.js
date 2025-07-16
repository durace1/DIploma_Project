import { uiTest as test, expect } from '../../src/helpers/fixtures';
import { ArticleBuilder, UserBuilder } from '../../src/helpers/builders/index';
//import { App } from '../src/pages/app.page'

test.describe('Article tests', () => {
test ('Создание статьи',{
    tag: ['@ARTICLE'],}, async ({page, app})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();
 
    //Регистрируемся
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
    await expect(app.newArticle.getEditButton()).toBeVisible();
})

test ('Поставить лайк статье',{
    tag: ['@ARTICLE'],}, async ({page, app})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();

    //Регистрируемся
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
    await expect(app.newArticle.getEditButton()).toBeVisible();

    //Поставим лайк статье
    await app.main.open();
    await app.globalFeed.open();
    await app.globalFeed.likeArticle();
    await expect(app.newArticle.getLikeButton()).toHaveText('  ( 1 )');
})

test ('Отфильтровать статью по тегу из списка',{
    tag: ['@ARTICLE'],}, async ({page, app})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();

    //Регистрируемся
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