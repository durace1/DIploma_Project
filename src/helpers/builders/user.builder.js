import { faker } from '@faker-js/faker';
export class UserBuilder {
     addPassword(symbol = 10) {
        this.password = faker.internet.password({length: symbol});
        return this;
     }
     addEmail() {
        this.email = faker.internet.email();
        return this;
     }
     addUsername() {
        this.username = faker.internet.username();
        return this;
     }
     generate()
     {
        return {
            email: this.email,
            password: this.password,
            username: this.username,
        };
     }
  }

