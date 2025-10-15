import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { transformSync } from "@babel/core";

const sourceCodePath = path.resolve("./input-babel.ts");
const pluginPath = path.resolve("./babel-plugin.js");

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
const sandbox = {
	require,
	module,
	console,
};
vm.createContext(sandbox);
script.runInContext(sandbox);
