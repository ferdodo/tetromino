import { createApp, ref, Ref } from "vue";
import { render } from "./template";
import { PuzzleComponent } from "./puzzle-component";
import { win$ } from "./win";
import { share } from "./share";
import { getMoveCount } from "./current-puzzle";
import "cookies-ds";

export const app = createApp({
	components: {
		PuzzleComponent
	},
	setup() {
		const win: Ref<boolean> = ref(false);
		win$.subscribe(value => {
			win.value = value
		
			if (value) {
				//@ts-ignore
				if (window.opener?.registerScore) {
					const moveCount = getMoveCount();
					//@ts-ignore
					window.opener.registerScore("tetromino", moveCount);
					window.close();
				}
			}
		
		});
		return { win, share };
	},
	render
});

app.mount("body");
