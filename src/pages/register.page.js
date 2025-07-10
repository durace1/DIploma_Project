export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.signupButton = page.getByRole('button', { name: 'Sign up' });
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.usernameField = page.getByRole('textbox', { name: 'Your Name' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    };

    async signup(randomUser) {
        const { email, password, username } = randomUser;
        await this.usernameField.click();
        await this.usernameField.fill(username);
        await this.emailField.click();
        await this.emailField.fill(email);
        await this.passwordField.click();
        await this.passwordField.fill(password); 
        await this.signupButton.click();
    }

    async login(randomUser) {
        const { email, password } = randomUser;
        await this.emailField.click();
        await this.emailField.fill(email);
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}


