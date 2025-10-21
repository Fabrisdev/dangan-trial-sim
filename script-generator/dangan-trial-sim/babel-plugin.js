module.exports = ({ types: t }) => ({
	name: "if-to-system-if",
	visitor: {
		IfStatement(path) {
			const hasSystemComment = path.node.leadingComments?.some((c) =>
				c.value.includes("@system"),
			);
			if (!hasSystemComment) return;

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

				let newExpression = t.callExpression(
					t.memberExpression(t.identifier("system"), t.identifier("if")),
					[left, right, t.arrowFunctionExpression([], body, false)],
				);

				if (path.node.alternate) {
					const elseBody = path.node.alternate;
					newExpression = t.callExpression(
						t.memberExpression(newExpression, t.identifier("else")),
						[t.arrowFunctionExpression([], elseBody, false)],
					);
				}

				path.replaceWith(t.expressionStatement(newExpression));
			}
		},
	},
});
