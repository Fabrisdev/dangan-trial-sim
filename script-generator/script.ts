import { writeFileSync } from "node:fs";

const output: string[] = [];

process.on("exit", () => {
	writeFileSync("output.txt", output.join("\n"), "utf-8");
});

type CharacterName =
	| "hina"
	| "makoto"
	| "byakuya"
	| "toko"
	| "kyoko"
	| "hifumi"
	| "sakura"
	| "leon"
	| "celeste"
	| "chihiro"
	| "yasuhiro"
	| "mondo"
	| "kiyotaka";

type Character = {
	name: CharacterName;
	expression: (exp: Expression) => void;
	say: (text: string) => void;
};

export const system = {
	assign: (character: Character, seat: number) =>
		output.push(`system: assign ${character.name}:${seat}`),
	wait: (seconds: number) => output.push(`system: wait ${seconds}s`),
};

export const camera = {
	focusOn: (character: Character) =>
		output.push(`camera: focus_on ${character.name}`),
};

type Expression = "happy" | "sad" | "angry" | "excited" | "shoot" | "you"; //TODO: make the expression type depend on character type

export function actor(name: CharacterName): Character {
	return {
		name,
		expression: (exp: Expression) => output.push(`${name}: expression ${exp}`),
		say: (text: string) => output.push(`${name}: say ${text}`),
	};
}
