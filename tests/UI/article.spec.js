import { uiTest as test, expect } from '../../src/helpers/fixtures';
import { ArticleBuilder, UserBuilder } from '../../src/helpers/builders/index';

test.describe('Article tests', () => {
test ('Создание статьи',{
    tag: ['@ARTICLE'],}, async ({app, authUser})=> {
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
    tag: ['@ARTICLE'],}, async ({app, authUser})=> {
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
    tag: ['@ARTICLE'],}, async ({app, authUser})=> {
    //Фильтруемся по тегу справа
    const tagName = await app.main.firstTag.textContent();
    await app.main.tagFiltering();
    await expect(app.main.firstArticleTag).toContainText(tagName)
})
})