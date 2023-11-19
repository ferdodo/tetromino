import { Ref, ref, defineComponent, onUnmounted } from "vue";
import { render } from "./placed-tetromino-block-component.template";
import { TetrominoBlockComponent } from "./tetromino-block-component";
import { getPlacedTetrominoBlock } from "./get-placed-tetromino-block";
import { observePlacedTetrominoBlock } from "./observe-placed-tetromino-block";
import { Block } from "blockwise";

export const PlacedTetrominoBlockComponent = defineComponent({
	components: {
        TetrominoBlockComponent
    },
    props: {
        id: { type:Number, required: true },
        blockIndex: { type: Number, required: true }
    },
	setup(props: { id: number, blockIndex: number }) {
        const placedTetrominoBlock: Ref<Block> = ref(getPlacedTetrominoBlock(props.id, props.blockIndex));

        const subscription = observePlacedTetrominoBlock(props.id, props.blockIndex)
            .subscribe(value => placedTetrominoBlock.value = value);

        onUnmounted(() => subscription.unsubscribe());
		return { placedTetrominoBlock };
	},
	render
});