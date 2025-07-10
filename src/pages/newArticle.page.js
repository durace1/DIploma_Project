export class NewArticlePage {
    constructor (page) {
        this.page = page;
        this.newArticleButton = page.getByRole('link', { name: '  New Article' });
        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.aboutArticle = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.contentArticle = page.getByRole('textbox', { name: 'Write your article (in' });
        this.tagsArticle = page.getByRole('textbox', { name: 'Enter tags' });
        this.createArticleButton = page.getByRole('button', { name: 'Publish Article' });
    }


    async open() {
        await this.page.goto('https://realworld.qa.guru/#/editor');
    }


    async newArticle(randomArticle) {
        const {title, info, content, tag} = randomArticle;
        await this.articleTitle.click();
        await this.articleTitle.fill(title);
        await this.aboutArticle.click();
        await this.aboutArticle.fill(info);
        await this.contentArticle.click();
        await this.contentArticle.fill(content);
        await this.tagsArticle.click();
        await this.tagsArticle.fill(tag);
        await this.createArticleButton.click();
    }
}