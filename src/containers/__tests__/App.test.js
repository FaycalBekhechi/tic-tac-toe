import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';

import { App } from '../App';
import Board from 'components/Board';
import Header from 'components/BoardHeader';
import BoardActions from 'components/BoardActions';

describe('<App/>', () => {
	const props = {
		movePiece: () => {},
		checkCompletedGame: () => {},
		boardSize: 3,
		board: [
			null, null, null,
			null, null, null,
			null, null, null
		],
		currentPlayer: 1,
		completed: false
	};

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App {...props}/>, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('should render the header', () => {
		const renderedComponent = shallow(<App {...props}/>);
		expect(renderedComponent.find(Header)).toHaveLength(1);
	});

	it('should render the actions', () => {
		const renderedComponent = shallow(<App {...props}/>);
		expect(renderedComponent.find(BoardActions)).toHaveLength(1);
	});

	it('should render the board', () => {
		const renderedComponent = shallow(<App {...props}/>);
		expect(renderedComponent.find(Board)).toHaveLength(1);
	});
});
