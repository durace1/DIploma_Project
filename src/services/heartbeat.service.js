import { test } from '@playwright/test';

export class Heartbeat {
    constructor (request) {
        this.request = request;
    }
        async patchCode(token) {
            return test.step('Patch status code check', async () => {
                const response = this.request.patch("/heartbeat",
                    {
                        headers: {
                            'x-challenger': token,
                        }
                    }
                )
                return response;
            })
        };

        async deleteCode(token) {
            return test.step('delete status code check', async () => {
                const response = this.request.delete("/heartbeat",
                    {
                        headers: {
                            'x-challenger': token,
                        }
                    }
                )
                return response;
            })
        };

        async getCode(token) {
            return test.step('get status code check', async () => {
                const response = this.request.get("/heartbeat",
                    {
                        headers: {
                            'x-challenger': token,
                        }
                    }
                )
                return response;
            })
        };
}