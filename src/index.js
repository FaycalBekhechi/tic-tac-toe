import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './containers/App';
import configureStore from './store/configureStore';
import { configureGame } from 'actions/gameActions';


const store = configureStore();

const renderDevTools = () => {
	if (process.env.NODE_ENV === 'development') {
		const { default: DevTools } = require('./containers/DevTools');
		return <DevTools/>;
	}
	return null;
};

const render = () => {
	store.dispatch(configureGame({ boardSize: 3 }));

	ReactDOM.render(
		<Provider store={store}>
			<App/>
			{renderDevTools()}
		</Provider>,
		document.getElementById('root')
	);
};


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

render();