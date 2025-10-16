import { writeFileSync } from "node:fs";

const output: string[] = [];

export function log(line: string) {
	output.push(line);
}

export function pop() {
	return output.pop();
}

process.on("exit", () => {
	writeFileSync(globalThis.outputFile, output.join("\n"), "utf-8");
});
