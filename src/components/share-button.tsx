import type React from "react";
import { share } from "../share";

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
		<crumbs-button
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			title="Copier dans le presse-papier"
			confetti="true"
		>
			Partager
		</crumbs-button>
	);
}
