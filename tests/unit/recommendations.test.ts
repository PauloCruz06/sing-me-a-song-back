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
    });
});

describe("unit tests of 'upvote' function in 'recommendationsService'", () => {
    it("must update score of a recommendation", async() => {
        const rec = recommendation();
        const id = 2;

        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementationOnce((): any => {
                return {
                    id: 1,
                    ...rec,
                    score: 2
                }
            });
        jest
            .spyOn(recommendationRepository, 'updateScore')
            .mockImplementationOnce((): any => {});
        
        await recommendationService.upvote(id);
        
        expect(recommendationRepository.updateScore).toBeCalled();
    });
    
    it("must don't call 'updateScore' when not finding a recommendation", async() => {
        const id = 2;

        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementationOnce((): any => {});
        
        const promise = recommendationService.upvote(id);

        expect(promise).rejects.toEqual({
            type: "not_found",
            message: ""
        });
    });
});

describe("unit tests of 'downvote' function in 'recommendationsService'", () => {
    it("must update score of a recommendation", async() => {
        const rec = recommendation();
        const id = 2;

        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementationOnce((): any => {
                return {
                    id: 1,
                    ...rec,
                    score: 2
                }
            });
        jest
            .spyOn(recommendationRepository, 'updateScore')
            .mockImplementationOnce((): any => {
                return {
                    id: 1,
                    ...rec,
                    score: 1
                }
            });
        jest
            .spyOn(recommendationRepository, 'remove')
            .mockImplementationOnce((): any => {});
        
        await recommendationService.downvote(id);

        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).not.toBeCalled();
    });

    it("must update score and remove of a recommendation", async() => {
        const rec = recommendation();
        const id = 2;

        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementationOnce((): any => {
                return {
                    id: 1,
                    ...rec,
                    score: -5
                }
            });
        jest
            .spyOn(recommendationRepository, 'updateScore')
            .mockImplementationOnce((): any => {
                return {
                    id: 1,
                    ...rec,
                    score: -6
                }
            });
        jest
            .spyOn(recommendationRepository, 'remove')
            .mockImplementationOnce((): any => {});
        
        await recommendationService.downvote(id);

        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).toBeCalled();
    });

    it("must don't call 'updateScore' when not finding a recommendation", async() => {
        const id = 2;

        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementationOnce((): any => {});
        
        const promise = recommendationService.downvote(id);

        expect(promise).rejects.toEqual({
            type: "not_found",
            message: ""
        });
    }); 
});

describe("unit tests of 'getById' function in 'recommendationsService'", () => {
    it("must return a recommedation", async() => {
        const rec = recommendation();
        const id = 3;

        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementationOnce((): any => {
                return {
                    id: 3,
                    ...rec,
                    score: 0
                }
            });

        const result = await recommendationService.getById(id);

        expect(result).toEqual({
            id: 3,
            ...rec,
            score: 0
        });
    });

    it("must return a 'not_found' message when not finding a recommendation", async() => {
        const id = 2;

        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementationOnce((): any => {});
        
        const promise = recommendationService.getById(id);

        expect(promise).rejects.toEqual({
            type: "not_found",
            message: ""
        });
    })
});

describe("unit tests of 'get' function in 'recommendationsService'", () => {
    it("must return a recommendationsList", async() => {
        jest
            .spyOn(recommendationRepository, 'findAll')
            .mockImplementationOnce((): any => ([
                {id: 3, ...recommendation(), score: 0},
                {id: 4, ...recommendation(), score: 2}
            ]));
        
        const result = await recommendationService.get();

        expect(result).toBeInstanceOf(Array);
    });
});

describe("unit tests of 'getTop' function in 'recommendationsService'", () => {
    it("must return a recommendationsList", async() => {
        const amount = 10;

        jest
            .spyOn(recommendationRepository, 'getAmountByScore')
            .mockImplementationOnce((): any => ([
                {id: 3, ...recommendation(), score: 0},
                {id: 4, ...recommendation(), score: 2}
            ]));
        
        const result = await recommendationService.getTop(amount);

        expect(result).toBeInstanceOf(Array);
    });
});