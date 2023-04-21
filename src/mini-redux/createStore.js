/**
 * 创建store对象
 *
 * @param {function} reducer
 * @param {*} preloadedState
 * @param {function} enhancer
 * @returns {store} store对象
 */
export default function createStore(reducer, preloadedState, enhancer) {
	// 当省略了preloadedState，直接传入enhancer时
	if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
		enhancer = preloadedState;
		preloadedState = undefined;
	}

	// 如果传入了enhancer，就返回enhancer
	if (typeof enhancer === "function") {
		return enhancer(createStore)(reducer, preloadedState);
	}

	// 初始化状态和监听函数
	let state = preloadedState;
	const listeners = [];

	/**
	 * 读取Store中的状态
	 *
	 * @returns 应用当前的状态
	 */
	function getState() {
		return state;
	}

	/**
	 * 添加监听函数
	 * @param {function} listener 监听函数每次Dispatch后都会被调用的回调函数
	 * @returns {function} 移除当前函数的订阅
	 */
	function subscribe(listener) {
		// 将监听函数添加到监听函数列表中
		listeners.push(listener);
		return function unsubscribe() {
			// 移除当前监听函数
			const index = listeners.indexOf(listener);
			listeners.splice(index, 1);
		};
	}

	/**
	 * 发送action
	 * @param {object} action action对象,来描述发生了什么改变
	 *
	 * @returns {object} 返回action本身
	 */
	function dispatch(action) {
		// 通过reducer获取新的状态
		state = reducer(state, action);
		// 通知所有监听函数
		listeners.forEach((listener) => listener());
		// 返回action本身
		return action;
	}

	// 初始化时，调用一次dispatch，传入一个随机的action
	dispatch({ type: "@@redux/INIT" });

	// 返回store对象
	return {
		getState,
		subscribe,
		dispatch,
	};
}
