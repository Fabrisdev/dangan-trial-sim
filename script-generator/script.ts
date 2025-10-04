import { writeFileSync } from "node:fs";
import { Camera, System } from "./entities";

const output: string[] = [];

export function log(line: string) {
	output.push(line);
}

process.on("exit", () => {
	writeFileSync("output.trial", output.join("\n"), "utf-8");
});

export const system = new System();
export const camera = new Camera();
