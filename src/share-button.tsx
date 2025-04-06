import type React from "react";
import { share } from "./share";
import "cookies-ds";

export function ShareButton() {
	const handleClick = () => {
		share();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			share();
		}
	};

	return (
		<cookies-button
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			title="Copier dans le presse-papier"
			confetti="true"
		>
			Partager
		</cookies-button>
	);
}
