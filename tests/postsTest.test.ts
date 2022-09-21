import { prisma } from "../src/database.js";
import app from "../src/app.js";
import supertest from "supertest";

beforeAll( async() => 
    await prisma.$executeRaw`TRUNCATE TABLE recommendations CASCADE;`
);

describe("Test route POST '/'", () => {
    it.todo("must return a 201 status code");
    it.todo(`must to return a 409 status code when
             trying to insert another recommendation
             with the same name`);
});

describe("Test route POST '/:id/upvote'", () => {
    it.todo("must return a 200 status code");
});

describe("Test route POST '/:id/downvote'", () => {
    it.todo("must return a 200 status code");
});

afterAll ( async() => await prisma.$disconnect());