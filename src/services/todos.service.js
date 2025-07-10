import { test } from '@playwright/test';

export class ToDosService {
    constructor (request) {
        this.request = request;
    }

    async get(token, filter ='', acceptHeader) {
        return test.step("Получение списка заданий", async () => {
            const response = await this.request.get(`/todos${filter}`, {
                headers: {
                    'x-challenger': token,
                    'accept': acceptHeader,
                }
            });
            return response;
        });
    };

    async getNotFound(token) {
        return test.step("Неверный запрос списка заданий", async () => {
            const response = await this.request.get("/todo", {
                headers: {
                    'x-challenger': token,
                }
            });
            return response;
        });
    };

    async getId(token, id) {
        return test.step("Получить задание по id", async () => {
            const response = await this.request.get(`/todos/${id}`, {
                headers: {
                    'x-challenger': token,
                },
            });
            return response;
        });
    };

    async post(token, title, description, status) {
        return test.step('Создание задачи', async () => {
            const response = await this.request.post("/todos",
                {
                    headers: {
                        'x-challenger': token,
                    },
                    data:{
                        'title': title,
                        'doneStatus': status,
                        'description': description
                    }
                })
            return response;
        })
    }

    async postFake(token, title, description, status) {
        return test.step('Создание задачи с несуществующим параметром', async () => {
            const response = await this.request.post("/todos",
                {
                    headers: {
                        'x-challenger': token,
                    },
                    data:{
                        'title': title,
                        'doneStatus': status,
                        'description': description,
                        'priority': title,
                    }
                })
            return response;
        })
    }

    async postId(token, id, title, description, status) {
        return test.step('апдейт задачи по ид', async () => {
            const response = await this.request.post(`/todos/${id}`,
                {
                    headers: {
                        'x-challenger': token,
                    },
                    data:{
                        'title': title,
                        'doneStatus': status,
                        'description': description
                    }
                })
            return response;
        })
    }

    async put(token, id, title, description, status) {
        return test.step('апдейт', async () => {
            const response = await this.request.put(`/todos/${id}`,
                {
                    headers: {
                        'x-challenger': token,
                    },
                    data:{
                        'title': title,
                        'doneStatus': status,
                        'description': description
                    }
                })
            return response;
        })
    }

    async putTitle(token, id, title, description, status) {
        return test.step('апдейт', async () => {
            const response = await this.request.put(`/todos/${id}`,
                {
                    headers: {
                        'x-challenger': token,
                    },
                    data:{
                        'title': title,
                    }
                })
            return response;
        })
    }

    async putNoTitle(token, id, description, status) {
        return test.step('апдейт', async () => {
            const response = await this.request.put(`/todos/${id}`,
                {
                    headers: {
                        'x-challenger': token,
                    },
                    data:{
                        'doneStatus': status,
                        'description': description
                    }
                })
            return response;
        })
    }

    async putNewTitle(token, id, newId, title, description, status) {
        return test.step('апдейт', async () => {
            const response = await this.request.put(`/todos/${id}`,
                {
                    headers: {
                        'x-challenger': token,
                    },
                    data:{
                        'id': newId,
                        'title': title,
                        'doneStatus': status,
                        'description': description,
                    }
                })
            return response;
        })
    }

    async delete(token, id) {
        return test.step("Удалить задание", async () => {
            const response = await this.request.delete(`/todos/${id}`, {
                headers: {
                    'x-challenger': token,
                }
            });
            return response;
        });
    };

    async getByType(token, acceptHeader) {
        return test.step("Удалить задание", async () => {
            const response = await this.request.get("/todos", {
                headers: {
                    'x-challenger': token,
                    'Accept': acceptHeader,
                }
            });
            return response;
        });
    };
}


