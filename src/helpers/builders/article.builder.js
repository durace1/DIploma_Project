import { faker } from '@faker-js/faker';


export class ArticleBuilder {
    generateArticleTitle() {
        this.articleTitle = faker.commerce.productName();
        return this
    };
    generateArticleInfo() {
        this.articleInfo = faker.commerce.productDescription();
        return this
    };
    generateArticleContent() {
        this.articleContent = faker.lorem.sentences(4);
        return this
    };
    generateArticleTag() {
        this.articleTag = faker.music.genre();
        return this
    };
    generate() {
        return {
            title: this.articleTitle,
            info: this.articleInfo,
            content: this.articleContent,
            tag: this.articleTag,
        }
    }
}