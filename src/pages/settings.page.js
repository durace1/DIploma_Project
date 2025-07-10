export class SettingsPage {
    constructor(page) {
        this.page = page;
        this.profileButton = page.locator('li>div[class="nav-link dropdown-toggle cursor-pointer"]');
        this.settingsButton = page.getByRole('link', { name: ' Settings' });
        this.updatePassword = page.getByRole('textbox', { name: 'Password' });
        this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
        this.logoutButton = page.getByRole('link', { name: ' Logout' });
    };

    async open() {
        await this.page.goto('https://realworld.qa.guru/#/settings');
    };

    async changePassword(randomUser) {
        const {password} = randomUser;
        await this.updatePassword.click();
        await this.updatePassword.fill(password);
        await this.updateSettingsButton.click();

    };

    async clickLogoutButton() {
        await this.profileButton.click();
        await this.logoutButton.click();
    }
}