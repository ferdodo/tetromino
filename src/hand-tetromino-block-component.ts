import { Ref, ref, defineComponent } from "vue";
import { render } from "./hand-tetromino-block-component.template";
import { TetrominoBlockComponent } from "./tetromino-block-component";
import { Block } from "blockwise";
import { getHandTetrominoBlock } from "./get-hand-tetromino-block";

export const HandTetrominoBlockComponent = defineComponent({
	components: {
        TetrominoBlockComponent
    },
    props: {
        id: { type:Number, required: true },
        handIndex: { type: Number, required: true },
        blockIndex: { type: Number, required: true }
    },
	setup(props: { id: number, handIndex: number, blockIndex: number }) {
        const handTetrominoBlock: Ref<Block> = ref(getHandTetrominoBlock(props.id, props.handIndex, props.blockIndex));
		return { handTetrominoBlock };
	},
	render
});