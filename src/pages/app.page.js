import { GlobalFeedPage, MainPage, RegisterPage, SettingsPage, NewArticlePage } from './index';

export class App {
    constructor(page) {
        this.page = page;
        this.globalFeed = new GlobalFeedPage(page)
        this.main = new MainPage(page);
        this.register = new RegisterPage(page);
        this.settings = new SettingsPage(page);
        this.newArticle = new NewArticlePage(page);
    }
}