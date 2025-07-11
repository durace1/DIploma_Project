import { expect } from "@playwright/test";
import { test } from "../src/helpers/fixtures/index";
import { builder } from "../src/helpers/builders/api.builder";
 
let token;

test.beforeAll(async ({ api }) => {
    token = await api.challenger.post();
    console.log(token)
 });

test.describe('GET Challenges', () => {

    test('#02 GET /challenges(200)',{
    tag: ['@GET'],}, async ({ api }) => {
    const response = await api.challenger.get(token);
    const body = await response.json();
    await expect (response.status()).toBe(200);
    await expect (body.challenges).toHaveLength(59);
    });

    test('#03 GET /todos(200)',{
    tag: ['@GET'],}, async ({ api }) => {
    const response = await api.todos.get(token);
    const body = await response.json();
    await expect (response.status()).toBe(200);
    await expect (body.todos).toHaveLength(10);
    });

    test('#04 GET /todo(404)',{
    tag: ['@GET'],}, async ({ api }) => {
    const response = await api.todos.getNotFound(token);
    await expect (response.status()).toBe(404);
    });
    
    test('#25 GET /todos?xml(200)',{
    tag: ['@GET'],}, async ({ api }) => {
    const acceptHeader = 'application/xml'
    const response = await api.todos.getByType(token, acceptHeader);
    expect (response.status()).toBe(200);
    const responseHeader = response.headers()
    expect (responseHeader['content-type']).toBe('application/xml')
    });

    test('#26 GET /todos?json(200)',{
    tag: ['@GET'],}, async ({ api }) => {
    const acceptHeader = 'application/json'
    const response = await api.todos.getByType(token, acceptHeader);
    expect (response.status()).toBe(200);
    const responseHeader = response.headers()
    expect (responseHeader['content-type']).toBe('application/json')
    });

    test('#27 GET /todos?*/*(200)',{
    tag: ['@GET'],}, async ({ api }) => {
    const acceptHeader = '*/*'
    const response = await api.todos.getByType(token, acceptHeader);
    expect (response.status()).toBe(200);
    const responseHeader = response.headers()
    expect (responseHeader['content-type']).toBe('application/json')
    });

    test('#28 GET /todos?(200)',{
    tag: ['@GET'],}, async ({ api }) => {
    const acceptHeader = 'application/xml,application/json'
    const response = await api.todos.getByType(token, acceptHeader);
    expect (response.status()).toBe(200);
    const responseHeader = response.headers()
    expect (responseHeader['content-type']).toBe('application/xml')
    });
    
    test('#29 GET /todos?(200)',{
    tag: ['@GET'],}, async ({ api }) => {
    const acceptHeader = ''
    const response = await api.todos.getByType(token, acceptHeader);
    expect (response.status()).toBe(200);
    const responseHeader = response.headers()
    expect (responseHeader['content-type']).toBe('application/json')
    });

    test('#30 GET /todos?gzip(406)',{
    tag: ['@GET'],}, async ({ api }) => {
    const acceptHeader = 'application/gzip'
    const response = await api.todos.getByType(token, acceptHeader);
    expect (response.status()).toBe(406);
    expect (response.statusText()).toBe('Not Acceptable')
    });

    test('#34 /challenger/guid(200)',{
    tag: ['@GET'],}, async ({ api }) => {
    const response = await api.challenger.get(token);
    const headers = response.headers()
    const body = await response.json();
    expect (response.status()).toBe(200)
    expect (headers['x-challenger']).toBe(token)
    expect (body['challengeStatus']).not.toBeNull()     
    })
})
test.describe('POST Challenges', () => {

    test('#08POST /todos(201)',{
    tag: ['@POST'],}, async ({ api }) => {
    const randomCreate = new builder().createTitle().createDescription().createStatus().generate();
    const response = await api.todos.post(token, randomCreate.title, randomCreate.description, randomCreate.status);
    const body = await response.json();
    await expect (response.status()).toBe(201);
    await expect (body.title).toBe(randomCreate.title);
    })
})

test.describe('PATCH Challenges', () => {
    test('#42PATCH /heartbeat(500)',{
    tag: ['@PATCH'],}, async ({ api }) => {
    const response = await api.heartbeat.patchCode(token);
    console.log("Используемый токен:", token);
    expect (response.status()).toBe(500);
    expect (response.statusText()).toBe('Internal Server Error');
    })
    })

test.describe('DELETE Challenges', () => {
    test('#42DELETE /heartbeat(405)',{
    tag: ['@DELETE'],}, async ({ api }) => {
    const response = await api.heartbeat.deleteCode(token);
    expect (response.status()).toBe(405);
    expect (response.statusText()).toBe('Method Not Allowed');
    })
})
