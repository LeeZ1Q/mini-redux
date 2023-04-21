/**
 * 将函数从右向左组合起来
 *
 * @param funcs 要组合的函数
 * @returns 组合后的函数
 * For example, `compose(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 */
export default function compose(...funcs) {
	// 如果没有传入函数，返回一个返回参数的函数
	if (funcs.length === 0) {
		return (arg) => arg;
	}

	// 如果只传入一个函数，直接返回
	if (funcs.length === 1) {
		return funcs[0];
	}

	//如果传入多个函数，从右向左组合
	return funcs.reduce(
		(composed, func) =>
			(...args) =>
				composed(func(...args))
	);
}
