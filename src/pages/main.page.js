export class MainPage {
    constructor(page) {
        this.page = page;
        this.signupButton = page.getByRole('link', { name: 'Sign up' });
        this.loginButton = page.getByRole('link', { name: 'Login' });
        this.profileNameField = page.getByRole('navigation')
        this.firstTag = page.locator('//button[@class="tag-pill tag-default"][1]');
        this.firstArticleTag = page.locator('//div[@class="article-preview"][1]//li[@class="tag-default tag-pill tag-outline"][1]')
    };

    async open() {
        await this.page.goto('https://realworld.qa.guru/');
    };

    async goToSignup() {
        await this.signupButton.click();
    }
    async gotoLogin() {
        await this.loginButton.click();
    };

    async tagFiltering() {
        await this.firstTag.click();
    }
}