export class NewArticlePage {
    constructor (page) {
        this.page = page;
        this.newArticleButton = page.getByRole('link', { name: '  New Article' });
        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.aboutArticle = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.contentArticle = page.getByRole('textbox', { name: 'Write your article (in' });
        this.tagsArticle = page.getByRole('textbox', { name: 'Enter tags' });
        this.createArticleButton = page.getByRole('button', { name: 'Publish Article' });
        this.editButton = page.locator('button:has-text("Edit Article")').first();
    }

    getEditButton() {
        return this.editButton;
    }
    

    getLikeButton() {
        return this.page.locator('button:has-text("(")').first();
    }


    async open() {
        await this.page.goto("#/editor");
    }


    async newArticle(randomArticle) {
        const {title, info, content, tag} = randomArticle;
        await this.newArticleButton.click();
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