import { faker } from '@faker-js/faker';
export class builder {
    createTitle() {
        this.title = faker.book.title();
        return this;
    };

    createDescription() {
        this.description = faker.food.description();
        return this;
    };

    createStatus() {
        this.status = faker.datatype.boolean();
        return this;
    };

    generate() {
        return {
            title: this.title,
            description: this.description,
            status: this.status
        }
    }
}