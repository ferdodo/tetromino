import type { Block } from "blockwise";
import type { PlacedTetromino } from "./placed-tetromino";
import { useState, useEffect } from "react";
import { getCandidate } from "./get-candidate";
import { observeCandidate } from "./observe-candidate";
import { getCandidateTetrominoBlocks } from "./get-candidate-tetromino-blocks";
import { observeCandidateTetrominoBlocks } from "./observe-candicate-tetromino-blocks";
import { TetrominoBlockComponent } from "./tetromino-block-component";

export function CandidateComponent() {
	const [candidate, setCandidate] = useState<PlacedTetromino | null>(
		getCandidate(),
	);
	const [candidateBlocks, setCandidateBlocks] = useState<Block[]>(
		getCandidateTetrominoBlocks() || [],
	);

	useEffect(() => {
		const candidateSubscription = observeCandidate().subscribe((value) =>
			setCandidate(value),
		);
		const blocksSubscription = observeCandidateTetrominoBlocks().subscribe(
			(value) => setCandidateBlocks(value || []),
		);

		return () => {
			candidateSubscription.unsubscribe();
			blocksSubscription.unsubscribe();
		};
	}, []);

	if (!candidate) return null;

	return (
		<>
			{candidateBlocks.map((block) => (
				<div
					key={`candidate-block-${candidate.id}-x-${block.x}-y-${block.y}`}
					style={{
						gridArea: `${block.y + 1}/${block.x + 1}/${block.y + 2}/${block.x + 2}`,
					}}
				>
					<TetrominoBlockComponent id={candidate.id} moving={true} />
				</div>
			))}
		</>
	);
}
