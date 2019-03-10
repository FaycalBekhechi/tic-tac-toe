import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { movePiece, checkCompletedGame, resetGame, initGame } from 'actions/gameActions';
import { gameStateSelector, currentPlayer, gameCompleted, gameStarted } from 'selectors/selectors';
import BoardHeader from 'components/BoardHeader';
import Board from '../components/Board';
import BoardActions from 'components/BoardActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EndGameScreen from '../components/EndGameScreen';

import { FaBeer } from 'react-icons/fa';

export class App extends React.Component {
	onCellClick = ({ x, y }) => {
		const { currentPlayer: player } = this.props;
		this.props.movePiece({ player, x, y });
		this.props.checkCompletedGame();
	};

	onResetClick = async () => {
		this.props.resetGame();
		this.props.initGame({ boardSize: 3 });
	};

	render() {
		// return (
		//   <div className="App">
		//     <header className="App-header">
		//       <img src={logo} className="App-logo" alt="logo" />
		//       <p>
		//         Edit <code>src/App.js</code> and save to reload.
		//       </p>
		//       <a
		//         className="App-link"
		//         href="https://reactjs.org"
		//         target="_blank"
		//         rel="noopener noreferrer"
		//       >
		//         Learn React
		//       </a>
		//     </header>
		//   </div>
		// );
		const { board, boardSize, completed, draw, winner, started } = this.props;
		return (
			<div className="App">
				<BoardHeader/>
				<div className="app-board-viewport">
					{started && <Board boardSize={boardSize} board={board} completed={completed} onCellClick={this.onCellClick}/>}
					{completed && <EndGameScreen draw={draw} winner={winner} completed={completed}/>}
				</div>
				<BoardActions>
					<span onClick={this.onResetClick}><FaBeer/></span>
				</BoardActions>
			</div>
		);
	}
}

App.propTypes = {
	movePiece: PropTypes.func.isRequired,
	checkCompletedGame: PropTypes.func.isRequired,
	resetGame: PropTypes.func.isRequired,
	initGame: PropTypes.func.isRequired,
	boardSize: PropTypes.number.isRequired,
	board: PropTypes.array.isRequired,
	winner: PropTypes.number,
	draw: PropTypes.bool.isRequired,
	currentPlayer: PropTypes.number.isRequired,
	completed: PropTypes.bool.isRequired,
	started: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	const gameState = gameStateSelector(state);
	const player = currentPlayer(state);
	const completed = gameCompleted(state);
	const started = gameStarted(state);
	return {
		boardSize: gameState.boardSize,
		board: gameState.board,
		winner: gameState.winner,
		draw: gameState.draw,
		currentPlayer: player,
		completed,
		started
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		movePiece,
		checkCompletedGame,
		resetGame,
		initGame
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
