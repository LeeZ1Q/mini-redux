export function loggerEnhancer(createStore) {
	return function (reducer, preloadedState) {
		const store = createStore(reducer, preloadedState);

		const newDispatch = (action) => {
			store.dispatch(action);
			console.log("This is a Logger!");
		};

		return { ...store, dispatch: newDispatch };
	};
}

export function loggerEnhancer2(createStore) {
	return function (reducer, preloadedState) {
		const store = createStore(reducer, preloadedState);

		const newDispatch = (action) => {
			store.dispatch(action);
			console.log("The 2nd Logger!");
		};

		return { ...store, dispatch: newDispatch };
	};
}
