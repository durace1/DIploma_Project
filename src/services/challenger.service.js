import { test } from '@playwright/test';

export class ChallengerService {
    constructor (request) {
        this.request = request;
    }
    async post() {
            return test.step('Получаем токен', async () => {
                const response = await this.request.post("/challenger");
                const headers = response.headers();
                const token = headers['x-challenger'];
                return token;
            });
    };
    async get(token) {
                return test.step('post /challenges', async () => {
                    const response = await this.request.get("/challenges", {
                        headers: {
                            'x-challenger': token,
                        },
                    });
                    return response;
                });
    };
};