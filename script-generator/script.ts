import { writeFileSync } from "node:fs";
import { Actor, Camera, System } from "./entities";
import type { CharacterName } from "./types";

const output: string[] = [];

export function log(line: string) {
	output.push(line);
}

process.on("exit", () => {
	writeFileSync("output.trial", output.join("\n"), "utf-8");
});

export const system = new System();
export const camera = new Camera();

export function actor(name: CharacterName): Actor {
	const character = new Actor(name);
	return character;
}
