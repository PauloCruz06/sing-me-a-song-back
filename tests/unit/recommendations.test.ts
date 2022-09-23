import { jest } from "@jest/globals";
import { Recommendation } from "@prisma/client";

import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import recommendation from "../factories/recommendationFactory.js"

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe("unit tests of 'insert' function in 'recommendationsService'", () => {
    it("must create a recommendation", async() => {
        const rec = recommendation();
        
        jest
            .spyOn(recommendationRepository, 'findByName')
            .mockImplementationOnce((): any => {});
        jest
            .spyOn(recommendationRepository, 'create')
            .mockImplementationOnce((): any => {});

        await recommendationService.insert(rec);

        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();
    });

    it("must not allow recommendations with the same name", async() => {
        const rec = recommendation();
        
        jest
            .spyOn(recommendationRepository, 'findByName')
            .mockImplementationOnce((): any => {
                return {
                    id: 1,
                    ...rec,
                    score: 2
                }
            });
        
        const promise = recommendationService.insert(rec);

        expect(promise).rejects.toEqual({
            type: "conflict",
            message: "Recommendations names must be unique"
        });
        expect(recommendationRepository.create).not.toBeCalled();
    });
});