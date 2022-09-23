import { prisma } from "../../src/database.js";
import app from "../../src/app.js";
import supertest from "supertest";

import recommendation from "../factories/recommendationFactory.js";

beforeEach( async() => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations CASCADE;`;
});

describe("Test route GET '/recommendations'", () => {
    it("must return an array", async() => {
        await supertest(app)
            .post('/recommendations')
            .send(recommendation());

        const result = await supertest(app)
            .get('/recommendations')
            .send();
        expect(result.body).toBeInstanceOf(Array);
    });
});

describe("Test route GET '/recommendations/random'", () => {
    it(`must return status code 404 if
        no recommendation exists`, async() => {
        const result = await supertest(app)
            .get('/recommendations/random')
            .send();
        expect(result.status).toBe(404);
    });
    
    it("must return an object", async() => {
        await supertest(app)
            .post('/recommendations')
            .send(recommendation());

        const result = await supertest(app)
            .get('/recommendations/random')
            .send();
        expect(result.body).toBeInstanceOf(Object);
    });
});

describe("Test route GET '/recommendations/top/:amount'", () => {
    it("must return an array", async() => {
        await supertest(app)
            .post('/recommendations')
            .send(recommendation());
        
        const result = await supertest(app)
            .get(`/recommendations/top/${10}`)
            .send();
        expect(result.body).toBeInstanceOf(Array);
    });
});

describe("Test route GET '/recommendations/:id'", () => {
    it("must return an object", async() => {
        await supertest(app)
            .post('/recommendations')
            .send(recommendation());

        const random = await supertest(app)
            .get('/recommendations/random')
            .send();

        const result = await supertest(app)
            .get(`/recommendations/${random.body.id}`)
            .send();
        expect(result.body).toBeInstanceOf(Object);
    });

    it(`must return status code 404 if there is
        no recommendation with the id passed`, async() => {
        const result = await supertest(app)
            .get(`/recommendations/${-1}`)
            .send();
        expect(result.status).toBe(404);
    });
});

afterAll ( async() => await prisma.$disconnect());