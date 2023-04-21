import compose from "./compose";

/**
 * 创建一个store enhancer，将中间件应用于Redux创建一个store的dispatch
 *
 * @param  {...Function} middlewares 中间件
 * @returns {Function} store enhancer:一个应用了所有中间件的Enhancer
 *
 */
export default function applyMiddleware(...middlewares) {
	return (createStore) => (reducer, preloadedState) => {
		const store = createStore(reducer, preloadedState);

		// 为了让中间件可以访问到dispatch，需要将store.dispatch传入
		const middlewareAPI = {
			getState: store.getState,
			dispatch: (action) => dispatch(action),
		};

		// 给每个中间件传入store.dispatch，然后返回一个新的chain
		const chain = middlewares.map((middleware) => middleware(middlewareAPI));
		// 重写dispatch，让dispatch可以执行所有中间件
		const dispatch = compose(...chain)(store.dispatch);

		return {
			...store,
			dispatch,
		};
	};
}
