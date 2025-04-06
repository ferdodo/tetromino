import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { PuzzleComponent } from "./components/puzzle-component";
import { win$ } from "./win";
import { getMoveCount } from "./current-puzzle";
import "crumbs-design-system";
import { ShareButton } from "./components/share-button";

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			"crumbs-panel": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
			"crumbs-h1": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
			"crumbs-p": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
			"crumbs-button": React.DetailedHTMLProps<
				React.ButtonHTMLAttributes<HTMLElement> & { confetti?: string },
				HTMLElement
			>;
		}
	}
}

function App() {
	const [win, setWin] = useState<boolean>(false);

	useEffect(() => {
		const subscription = win$.subscribe((value) => {
			setWin(value);

			if (value) {
				// @ts-ignore
				if (window.opener?.registerScore) {
					const moveCount = getMoveCount();
					// @ts-ignore
					window.opener.registerScore("tetromino", moveCount);
					window.close();
				}
			}
		});

		return () => subscription.unsubscribe();
	}, []);

	return (
		<crumbs-panel>
			<crumbs-h1>Tetromino</crumbs-h1>

			<crumbs-p>Placez tout les tetrominos dans la zone de jeu.</crumbs-p>

			<PuzzleComponent />

			{win && (
				<div>
					<crumbs-p style={{ textAlign: "center" }}>
						🎉 C'est gagné pour aujourd'hui ! 🥳 <br />
						<ShareButton />
					</crumbs-p>
				</div>
			)}
		</crumbs-panel>
	);
}

document.body.innerHTML = `<div id="root"></div>${document.body.innerHTML}`;

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
