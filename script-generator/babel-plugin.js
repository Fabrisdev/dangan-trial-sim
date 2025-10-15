module.exports = ({ types: t }) => ({
	name: "if-to-system-if",
	visitor: {
		IfStatement(path) {
			const test = path.node.test;

			if (
				t.isBinaryExpression(test) &&
				test.operator === "===" &&
				test.left &&
				test.right
			) {
				const left = test.left;
				const right = test.right;
				const body = path.node.consequent;

				const newNode = t.expressionStatement(
					t.callExpression(
						t.memberExpression(t.identifier("system"), t.identifier("if")),
						[left, right, t.arrowFunctionExpression([], body, false)],
					),
				);

				path.replaceWith(newNode);
			}
		},
	},
});
