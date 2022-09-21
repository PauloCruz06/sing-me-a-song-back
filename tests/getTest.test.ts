import { prisma } from "../src/database.js";
import app from "../src/app.js";
import supertest from "supertest";

beforeAll( async() => 
    await prisma.$executeRaw`TRUNCATE TABLE recommendations CASCADE;`
);

describe("Test route GET '/'", () => {
    it.todo("must return an object");
});

describe("Test route GET '/random'", () => {
    it.todo(`must return status code 404 if
             no recommendation exists`);
    it.todo("must return an object");
});

describe("Test route GET '/top/:amount'", () => {
    it.todo("must return an array");
});

describe("Test route GET '/:id'", () => {
    it.todo("must return an object");
    it.todo(`must return status code 404 if
             there is no recommendation with the id passed`);
});

afterAll ( async() => await prisma.$disconnect());