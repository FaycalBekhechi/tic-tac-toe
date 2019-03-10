import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';

import { App } from '../App';
import Board from 'components/Board';
import Header from 'components/BoardHeader';
import BoardActions from 'components/BoardActions';
import EndGameScreen from 'components/EndGameScreen';
import ScorePanel from 'components/ScorePanel';

describe('<App/>', () => {
	let props;
	beforeEach(() => {
		props = {
			movePiece: () => {
			},
			checkCompletedGame: () => {
			},
			resetGame: () => {
			},
			startGame: () => {
			},
			rewindMove: () => {
			},
			boardSize: 3,
			board: [
				null, null, null,
				null, null, null,
				null, null, null
			],
			winner: null,
			draw: false,
			currentPlayer: 1,
			scores: {
				player1: 0,
				player2: 0,
				draw: 0,
			},
			completed: false,
			started: true
		};
	});


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

	it('should render the score panel', () => {
		const renderedComponent = shallow(<App {...props}/>);
		expect(renderedComponent.find(ScorePanel)).toHaveLength(1);
	});

	it('should render the end game screen', () => {
		const actualProps = {
			...props,
			completed: true,
			winner: 1,
			draw: false
		};
		const renderedComponent = shallow(<App {...actualProps}/>);
		expect(renderedComponent.find(EndGameScreen)).toHaveLength(1);
	});
});
