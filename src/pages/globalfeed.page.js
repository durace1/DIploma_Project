export class GlobalFeedPage {
    constructor(page) {
        this.page = page;
        this.globalFeedPage = page.getByRole ('button', {name: 'Global Feed' });
        this.likeArticleButton = page.getByRole('button', { name: ' ( 0 )' });
    };

    async likeArticle () {
        await this.likeArticleButton.first().click();
    };

    async open () {
        await this.globalFeedPage.click();
    };
}