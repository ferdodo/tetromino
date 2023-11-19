import { Block } from "blockwise";
import { Tetromino } from "./tetromino";
import { PlacedTetromino } from "./placed-tetromino";

export interface Puzzle {
    gameZone: Block,
    successZone: Block,
    handZone: Block,
    hand: Tetromino[],
    candidate: PlacedTetromino | null,
    placed: PlacedTetromino[]
}

