module.exports = ({ types: t }) => ({
	name: "if-to-system-if",
	visitor: {
		IfStatement(path) {
			const test = path.node.test;

			// Solo procesar if (a === b)
			if (
				t.isBinaryExpression(test) &&
				test.operator === "===" &&
				test.left &&
				test.right
			) {
				const left = test.left;
				const right = test.right;
				const body = path.node.consequent;

				// system.if(a, b, () => { ... })
				let newExpression = t.callExpression(
					t.memberExpression(t.identifier("system"), t.identifier("if")),
					[left, right, t.arrowFunctionExpression([], body, false)],
				);

				// Si hay else, lo encadenamos con .else(() => { ... })
				if (path.node.alternate) {
					const elseBody = path.node.alternate;
					newExpression = t.callExpression(
						t.memberExpression(newExpression, t.identifier("else")),
						[t.arrowFunctionExpression([], elseBody, false)],
					);
				}

				// Reemplazamos el if completo
				path.replaceWith(t.expressionStatement(newExpression));
			}
		},
	},
});
