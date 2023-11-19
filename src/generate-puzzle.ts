import { Puzzle } from "./puzzle";

export function generatePuzzle(): Puzzle {
    return {
        gameZone: {
            x: 0,
            y: 0,
            w: 20,
            h: 10
        },
        successZone: {
            x: 1,
            y: 1,
            w: 8,
            h: 8
        },
        handZone: {
            x: 10,
            y: 0,
            w: 10,
            h: 10
        },
        hand: [{
            id: 0,
            blocks: [{
                x: 0,
                y: 0,
                w: 1,
                h: 1
            }, {
                x: 1,
                y: 0,
                w: 1,
                h: 1
            }, {
                x: 2,
                y: 0,
                w: 1,
                h: 1
            }, {
                x: 3,
                y: 0,
                w: 1,
                h: 1
            }]
        }, {
            id: 1,
            blocks: [{
                x: 0,
                y: 0,
                w: 1,
                h: 1
            }, {
                x: 1,
                y: 0,
                w: 1,
                h: 1
            }, {
                x: 2,
                y: 0,
                w: 1,
                h: 1
            }, {
                x: 2,
                y: 1,
                w: 1,
                h: 1
            }]
        }, {
            id: 2,
            blocks: [{
                x: 0,
                y: 0,
                w: 1,
                h: 1
            }, {
                x: 1,
                y: 0,
                w: 1,
                h: 1
            }, {
                x: 1,
                y: 1,
                w: 1,
                h: 1
            }, {
                x: 2,
                y: 1,
                w: 1,
                h: 1
            }]
        }, {
            id: 3,
            blocks: [{
                x: 0,
                y: 0,
                w: 1,
                h: 1
            }, {
                x: 1,
                y: 0,
                w: 1,
                h: 1
            }, {
                x: 1,
                y: 1,
                w: 1,
                h: 1
            }, {
                x: 1,
                y: 2,
                w: 1,
                h: 1
            }]
        }],
        candidate: null,
        placed: [{
            id: 0,
            block: {
                x: 3,
                y: 3,
                w: 0,
                h: 0
            }
        }]
    };
}