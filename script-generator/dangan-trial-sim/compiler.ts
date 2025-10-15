import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { transformSync } from "@babel/core";
import args from "args";

args.options([
	{
		name: "input",
		description: "Input file to compile",
	},
	{
		name: "output",
		description: "Output file",
	},
]);
const flags = args.parse(process.argv);
const unresolvedSourceCodePath = flags.input;

if (typeof unresolvedSourceCodePath !== "string")
	throw new Error("Missing input file [--input]");

const sourceCodePath = path.resolve(unresolvedSourceCodePath);
const pluginPath = path.resolve("dangan-trial-sim/babel-plugin.js");

const sourceCode = fs.readFileSync(sourceCodePath, "utf-8");

const { code } =
	transformSync(sourceCode, {
		filename: sourceCodePath,
		presets: [["@babel/preset-typescript", { allowDeclareFields: true }]],
		plugins: [pluginPath, "@babel/plugin-transform-modules-commonjs"],
		babelrc: false,
		configFile: false,
	}) || {};

if (!code) throw new Error("Babel no devolvió código");

const script = new vm.Script(code);

const outputFile = path.resolve(flags.output || "../output.trail");
const sandbox = {
	require,
	module,
	console,
	globalThis,
};
vm.createContext(sandbox);

sandbox.globalThis.outputFile = outputFile;

script.runInContext(sandbox);
