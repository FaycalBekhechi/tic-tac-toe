import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

function getDebugSessionKey() {
	// You can write custom logic here!
	// By default we try to read the key from ?debug_session=<key> in the address bar
	const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
	return matches && matches.length > 0 ? matches[1] : null;
}

export default function configureStore(initialState = {}, dependencies = {}) {
	const middlewares = [thunk.withExtraArgument(dependencies)];
	const enhancers = [];

	if (process.env.NODE_ENV === 'development') {
		const { logger } = require('redux-logger');
		middlewares.push(logger);

		const { default: DevTools } = require('../views/containers/DevTools');
		const { persistState } = require('redux-devtools');
		enhancers.push(DevTools.instrument(), persistState(getDebugSessionKey()));
	}

	const store = createStore(
		reducers,
		initialState,
		compose(
			applyMiddleware(...middlewares),
			...enhancers
		)
	);

	// reducers hot reloading
	if (module.hot) {
		module.hot.accept('../reducers', () => {
			store.replaceReducer(require('../reducers'));
		});
	}
	return store;
};
