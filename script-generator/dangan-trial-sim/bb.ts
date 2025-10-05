function color(color: string, text: string) {
	return `[color=${color}]${text}[/color]`;
}

export function bold(text: string) {
	return color("yellow", text);
}

export function narrate(...text: string[]) {
	return color("green", text.join(" "));
}

export function think(text: string) {
	return color("blue", text);
}

export function normal(text: string) {
	return color("white", text);
}
