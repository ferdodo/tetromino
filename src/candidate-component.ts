import { Ref, ref, defineComponent } from "vue";
import { render } from "./candidate-component.template";
import { PlacedTetromino } from "./placed-tetromino";
import { getCandidate } from "./get-candidate";
import { observeCandidate } from "./observe-candidate";
import { TetrominoBlockComponent } from "./tetromino-block-component";
import { getCandidateTetrominoBlocks } from "./get-candidate-tetromino-blocks";
import { Block } from "blockwise";
import { observeCandidateTetrominoBlocks } from "./observe-candicate-tetromino-blocks";

export const CandidateComponent = defineComponent({
    components: {
        TetrominoBlockComponent
    },
	setup() {
        const candidate: Ref<PlacedTetromino | null> = ref(getCandidate());
        const candidateBlocks: Ref<Block[]> = ref(getCandidateTetrominoBlocks() || []);
        observeCandidate().subscribe(value => candidate.value = value);
        observeCandidateTetrominoBlocks().subscribe(value => candidateBlocks.value = value || []);
		return { candidate, candidateBlocks };
	},
	render
});