import { writeFileSync } from "node:fs";

const output: string[] = [];

export function log(line: string) {
	output.push(line);
}

process.on("exit", () => {
	writeFileSync("output.trial", output.join("\n"), "utf-8");
});
