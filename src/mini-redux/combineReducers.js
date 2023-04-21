/**
 * 将传入的多个不同的reducers合并成一个reducer
 *
 * @param {object} reducers 存有多个不同reducers的对象
 *
 * @returns {function} 一个调用了所有传入reducers的reducer函数，并且会返回相同结构的状态对象
 */
export default function combineReducers(reducers) {
	//返回一个新的reducer函数
	return function combination(state = {}, action) {
		const nextState = {};
		//记录是否有状态发生了改变
		let hasChanged = false;
		//遍历reducers对象
		for (const key in reducers) {
			//获取旧的状态
			const previousStateForKey = state[key];
			//执行reducer函数，获取新的状态
			const nextStateForKey = reducers[key](previousStateForKey, action);
			//更新状态
			nextState[key] = nextStateForKey;
			//如果新旧状态不相同，则hasChanged为true
			hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
		}
		//如果状态发生了改变，则返回新的状态，否则返回旧的状态
		return hasChanged ? nextState : state;
	};
}
