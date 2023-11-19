import { Ref, ref, defineComponent } from "vue";
import { render } from "./puzzle-component.template";
import { Puzzle } from "./puzzle";
import { getCurrentPuzzle, currentPuzzle$, setCandidate, placeCandidate } from "./current-puzzle";
import { PlacedTetrominoBlockComponent } from "./placed-tetromino-block-component";
import { Tetromino } from "./tetromino";
import { getUnplacedHandTetromino } from "./get-unplaced-hand-tetrominos";
import { observeUnplacedHandTetromino } from "./observe-unplaced-hand-tetrominos";
import { HandTetrominoBlockComponent } from "./hand-tetromino-block-component";
import { MouseDetectionComponent } from "./mouse-detection-component";
import { CandidateComponent } from "./candidate-component";
import { mousePosition$ } from "./mouse-position";
import { Block } from "blockwise";
import { mouseClicks$ } from "./mouse-clicks";
import { getCandidate } from "./get-candidate";
import { getHandTetrominoBlock } from "./get-hand-tetromino-block";
import { getPlacedTetrominoBlock } from "./get-placed-tetromino-block";

mousePosition$.subscribe(function(position: Block) {
	const candidate = getCandidate();

	if (candidate === null) {
		return;
	}

	setCandidate(candidate.id, position);
});

mouseClicks$.subscribe(function(position: Block) {
	const candidate = getCandidate();

	if (candidate) {
		placeCandidate();
	} else {
		const unplacedHandTetrominos = getUnplacedHandTetromino();

		const clickOnHandTetromino = unplacedHandTetrominos.find((tetromino, index) => {
			const handBlocks = [
				getHandTetrominoBlock(tetromino.id, index, 0),
				getHandTetrominoBlock(tetromino.id, index, 1),
				getHandTetrominoBlock(tetromino.id, index, 2),
				getHandTetrominoBlock(tetromino.id, index, 3),
			];
			
			return handBlocks.some(block => block.x === position.x && block.y === position.y);
		});

		const clickOnPlacedTetromino = getCurrentPuzzle().placed.find(tetromino => {
			const placedBlocks = [
				getPlacedTetrominoBlock(tetromino.id, 0),
				getPlacedTetrominoBlock(tetromino.id, 1),
				getPlacedTetrominoBlock(tetromino.id, 2),
				getPlacedTetrominoBlock(tetromino.id, 3),
			];

			return placedBlocks.some(block => block.x === position.x && block.y === position.y);
		});

		if (clickOnHandTetromino) {
			setCandidate(clickOnHandTetromino.id, position);
		} else if (clickOnPlacedTetromino) {
			setCandidate(clickOnPlacedTetromino.id, position);
		}
	}
});

export const PuzzleComponent = defineComponent({
	components: {
		PlacedTetrominoBlockComponent,
		HandTetrominoBlockComponent,
		MouseDetectionComponent,
		CandidateComponent
    },
	setup() {
		const puzzle: Ref<Puzzle> = ref(getCurrentPuzzle());
		const unplacedHandTetrominos: Ref<Tetromino[]> = ref(getUnplacedHandTetromino())
		currentPuzzle$.subscribe(value => puzzle.value = value);
		observeUnplacedHandTetromino().subscribe(value => unplacedHandTetrominos.value = value);
		return { puzzle, unplacedHandTetrominos };
	},
	render
});