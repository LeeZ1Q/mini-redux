import { compose, createStore, applyMiddleware } from './src/mini-redux/index';
import { loggerEnhancer, loggerEnhancer2 } from './src/example/enhancer';
import { loggerMiddleware } from './src/example/middleware';

//获取元素
const container = document.querySelector("#container");
const increaseBtn = document.querySelector("#increaseBtn");
const decreaseBtn = document.querySelector("#decreaseBtn");

//Reducer
const reducer = (state = 0, action) => {
	switch (action.type) {
		case "counter/increment":
			return state + 1;
		case "counter/decrement":
			return state - 1;
		default:
			return state;
	}
};

//Store
const enhancer = compose(loggerEnhancer, loggerEnhancer2);
const store = createStore(
	reducer, 
	undefined, 
	compose(applyMiddleware(loggerMiddleware), enhancer)
);

//Render
const render = () => {
	container.innerHTML = store.getState();
};

//Subscribe
const unsubscribe = store.subscribe(render);

//Dispatch Action
increaseBtn.addEventListener("click", () => {
	store.dispatch({ type: "counter/increment" });
});

decreaseBtn.addEventListener("click", () => {
	store.dispatch({ type: "counter/decrement" });
});
