import React, { useState, useEffect } from "react";
import type { Puzzle } from "./puzzle";

import {
	getCurrentPuzzle,
	currentPuzzle$,
	setCandidate,
	placeCandidate,
	clearCandidate,
	clearPlaced,
} from "./current-puzzle";

import type { Tetromino } from "./tetromino";
import { getUnplacedHandTetromino } from "./get-unplaced-hand-tetrominos";
import { observeUnplacedHandTetromino } from "./observe-unplaced-hand-tetrominos";
import { HandTetrominoBlockComponent } from "./hand-tetromino-block-component";
import { MouseDetectionComponent } from "./mouse-detection-component";
import { CandidateComponent } from "./candidate-component";
import { mousePosition$ } from "./mouse-position";
import type { Block } from "blockwise";
import { mouseClicks$ } from "./mouse-clicks";
import { getCandidate } from "./get-candidate";
import { getHandTetrominoBlock } from "./get-hand-tetromino-block";
import { getPlacedTetrominoBlock } from "./get-placed-tetromino-block";
import { mouseRightClicks$ } from "./mouse-right-clicks";
import { PlacedTetrominoBlockComponent } from "./placed-tetromino-block-component";

// Garder les souscriptions à la racine comme dans le composant Vue original
mousePosition$.subscribe((position: Block) => {
	const candidate = getCandidate();

	if (candidate === null) {
		return;
	}

	setCandidate(candidate.id, position);
});

mouseClicks$.subscribe((position: Block) => {
	const candidate = getCandidate();

	if (candidate) {
		placeCandidate();
	} else {
		const unplacedHandTetrominos = getUnplacedHandTetromino();

		const clickOnHandTetromino = unplacedHandTetrominos.find(
			(tetromino, index) => {
				const handBlocks = [
					getHandTetrominoBlock(tetromino.id, index, 0),
					getHandTetrominoBlock(tetromino.id, index, 1),
					getHandTetrominoBlock(tetromino.id, index, 2),
					getHandTetrominoBlock(tetromino.id, index, 3),
				];

				return handBlocks.some(
					(block) => block.x === position.x && block.y === position.y,
				);
			},
		);

		const clickOnPlacedTetromino = getCurrentPuzzle().placed.find(
			(tetromino) => {
				const placedBlocks = [
					getPlacedTetrominoBlock(tetromino.id, 0),
					getPlacedTetrominoBlock(tetromino.id, 1),
					getPlacedTetrominoBlock(tetromino.id, 2),
					getPlacedTetrominoBlock(tetromino.id, 3),
				];

				return placedBlocks.some(
					(block) => block.x === position.x && block.y === position.y,
				);
			},
		);

		if (clickOnHandTetromino) {
			setCandidate(clickOnHandTetromino.id, position);
		} else if (clickOnPlacedTetromino) {
			setCandidate(clickOnPlacedTetromino.id, position);
		}
	}
});

mouseRightClicks$.subscribe((position: Block) => {
	const candidate = getCandidate();

	if (candidate) {
		clearCandidate();
	} else {
		const clickOnPlacedTetromino = getCurrentPuzzle().placed.find(
			(tetromino) => {
				const placedBlocks = [
					getPlacedTetrominoBlock(tetromino.id, 0),
					getPlacedTetrominoBlock(tetromino.id, 1),
					getPlacedTetrominoBlock(tetromino.id, 2),
					getPlacedTetrominoBlock(tetromino.id, 3),
				];

				return placedBlocks.some(
					(block) => block.x === position.x && block.y === position.y,
				);
			},
		);

		if (clickOnPlacedTetromino) {
			clearPlaced(clickOnPlacedTetromino.id);
		}
	}
});

export function PuzzleComponent() {
	const [puzzle, setPuzzle] = useState<Puzzle>(getCurrentPuzzle());
	const [unplacedHandTetrominos, setUnplacedHandTetrominos] = useState<
		Tetromino[]
	>(getUnplacedHandTetromino());

	useEffect(() => {
		const puzzleSubscription = currentPuzzle$.subscribe((value) =>
			setPuzzle(value),
		);
		const tetroSubscription = observeUnplacedHandTetromino().subscribe(
			(value) => setUnplacedHandTetrominos(value),
		);

		return () => {
			puzzleSubscription.unsubscribe();
			tetroSubscription.unsubscribe();
		};
	}, []);

	return (
		<div style={{ display: "grid", placeContent: "center" }}>
			<div
				className="game-zone"
				style={{
					width: "clamp(10rem, 80vw, 100rem)",
					height: "clamp(6.6rem, 53vw, 66rem)",
					display: "grid",
					gridTemplateColumns: `repeat(${puzzle.gameZone.w}, 1fr)`,
					gridTemplateRows: `repeat(${puzzle.gameZone.h}, 1fr)`,
				}}
			>
				<div
					className="success-zone"
					style={{
						gridArea: `${puzzle.successZone.y + 1}/${puzzle.successZone.x + 1}/${puzzle.successZone.y + puzzle.successZone.h + 1}/${puzzle.successZone.w + puzzle.successZone.x + 1}`,
					}}
				/>

				<div
					className="hand-zone"
					style={{
						gridArea: `${puzzle.handZone.y + 1}/${puzzle.handZone.x + 1}/${puzzle.handZone.y + puzzle.handZone.h + 1}/${puzzle.handZone.w + puzzle.handZone.x + 1}`,
					}}
				/>

				{/* Tetrominos placés */}
				{puzzle.placed.map((placedTetromino, index) => (
					<React.Fragment key={`${placedTetromino.id} ${index}`}>
						<PlacedTetrominoBlockComponent
							id={placedTetromino.id}
							blockIndex={0}
						/>
						<PlacedTetrominoBlockComponent
							id={placedTetromino.id}
							blockIndex={1}
						/>
						<PlacedTetrominoBlockComponent
							id={placedTetromino.id}
							blockIndex={2}
						/>
						<PlacedTetrominoBlockComponent
							id={placedTetromino.id}
							blockIndex={3}
						/>
					</React.Fragment>
				))}

				{/* Tetrominos dans la main */}
				{unplacedHandTetrominos.map((handTetromino, handIndex) => (
					<React.Fragment key={`${handTetromino.id} ${handIndex}`}>
						<HandTetrominoBlockComponent
							id={handTetromino.id}
							handIndex={handIndex}
							blockIndex={0}
						/>
						<HandTetrominoBlockComponent
							id={handTetromino.id}
							handIndex={handIndex}
							blockIndex={1}
						/>
						<HandTetrominoBlockComponent
							id={handTetromino.id}
							handIndex={handIndex}
							blockIndex={2}
						/>
						<HandTetrominoBlockComponent
							id={handTetromino.id}
							handIndex={handIndex}
							blockIndex={3}
						/>
					</React.Fragment>
				))}

				{/* Composant candidat */}
				<CandidateComponent />

				{/* Grille de détection de souris */}
				{Array.from({ length: puzzle.gameZone.h }).map((_, y) =>
					Array.from({ length: puzzle.gameZone.w }).map((_, x) => (
						<MouseDetectionComponent
							key={`${x + 1}-${y + 1}`}
							x={x + 1}
							y={y + 1}
						/>
					)),
				)}
			</div>
		</div>
	);
}
