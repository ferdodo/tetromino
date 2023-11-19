import { /* Ref, ref, */ defineComponent } from "vue";
import { render } from "./tetromino-block-component.template";
import { getColor } from "./get-color";


export const TetrominoBlockComponent = defineComponent({
	components: {
    },
    props: {
    	id: {
    		required: true,
    		type: Number
    	}
    },
	setup(props) {
		const color = getColor(props.id);
		return { color };
	},
	render
});
