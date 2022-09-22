import { faker } from "@faker-js/faker";

export default function recommendationFactory() {
    return {
        name: faker.lorem.words(),
        youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    };
}