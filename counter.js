import { createStore } from './src/mini-redux/index';
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
const store = createStore(reducer);

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
