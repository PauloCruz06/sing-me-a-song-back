import { prisma } from "../../src/database.js";
import app from "../../src/app.js";
import supertest from "supertest";

import recommendation from "../factories/recommendationFactory.js";

beforeEach( async() => 
    await prisma.$executeRaw`TRUNCATE TABLE recommendations CASCADE;`
);

describe("Test route POST '/recommendations'", () => { 
    it("must return a 201 status code", async() => {
        const result = await supertest(app)
            .post('/recommendations')
            .send(recommendation());
        expect(result.status).toBe(201);
    });
    
    it(`must to return a 409 status code when
        trying to insert another recommendation
        with the same name`, async() => {
        const rec = recommendation();

        await supertest(app)
            .post('/recommendations')
            .send(rec);
        
        const result = await supertest(app)
            .post('/recommendations')
            .send(rec);
        expect(result.status).toBe(409);
    });
});

describe("Test route POST '/recommendations/:id/upvote'", () => {
    it("must return a 200 status code", async() => {
        await supertest(app)
            .post('/recommendations')
            .send(recommendation());

        const random = await supertest(app)
            .get('/recommendations')
            .send();

        const result = await supertest(app)
            .post(`/recommendations/${random.body[0].id}/upvote`)
            .send();
        expect(result.status).toBe(200);
    });

    it(`must return a 404 status code when
        sent an id that does not exist`, async() => {
        const result = await supertest(app)
            .post(`/recommendations/${-1}/upvote`)
            .send();
        expect(result.status).toBe(404);
    });
});

describe("Test route POST '/recommendations/:id/downvote'", () => {
    it("must return a 200 status code", async() => {
        await supertest(app)
            .post('/recommendations')
            .send(recommendation());

        const random = await supertest(app)
            .get('/recommendations')
            .send();

        const result = await supertest(app)
            .post(`/recommendations/${random.body[0].id}/downvote`)
            .send();
        expect(result.status).toBe(200);
    });

    it(`must return a 404 status code when
        sent an id that does not exist`, async() => {
        const result = await supertest(app)
            .post(`/recommendations/${-1}/downvote`)
            .send();
        expect(result.status).toBe(404);
    });
});

afterAll ( async() => await prisma.$disconnect());