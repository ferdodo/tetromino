import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { PuzzleComponent } from "./puzzle-component";
import { win$ } from "./win";
import { share } from "./share";
import { getMoveCount } from "./current-puzzle";
import "cookies-ds";

// Déclaration pour TypeScript des éléments personnalisés
declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			"cookies-panel": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
			"cookies-h1": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
			"cookies-p": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
			"cookies-button": React.DetailedHTMLProps<
				React.ButtonHTMLAttributes<HTMLElement> & { confetti?: string },
				HTMLElement
			>;
		}
	}
}

const App: React.FC = () => {
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
		<cookies-panel>
			<cookies-h1>Tetromino</cookies-h1>

			<cookies-p>Placez tout les tetrominos dans la zone de jeu.</cookies-p>

			<PuzzleComponent />

			{win && (
				<div>
					<cookies-p style={{ textAlign: "center" }}>
						🎉 C'est gagné pour aujourd'hui ! 🥳 <br />
						<cookies-button
							onClick={share}
							title="Copier dans le presse-papier"
							confetti="true"
						>
							Partager
						</cookies-button>
					</cookies-p>
				</div>
			)}
		</cookies-panel>
	);
};

// Modification du HTML pour ajouter un élément racine
document.body.innerHTML = '<div id="root"></div>' + document.body.innerHTML;

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
