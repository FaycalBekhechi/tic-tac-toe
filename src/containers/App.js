import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { movePiece, checkCompletedGame, resetGame, startGame, rewindMove } from 'actions/gameActions';
import { gameStateSelector, currentPlayer, gameCompleted, gameStarted } from 'selectors/selectors';
import wait from 'utils/wait';
import BoardHeader from 'components/BoardHeader';
import ScorePanel from 'components/ScorePanel';
import Board from 'components/Board';
import BoardActions from 'components/BoardActions';
import BoardActionButton from 'components/BoardActionButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EndGameScreen from 'components/EndGameScreen';

export class App extends React.Component {
	onCellClick = ({ x, y }) => {
		const { currentPlayer: player } = this.props;
		this.props.movePiece({ player, x, y });
		this.props.checkCompletedGame();
	};

	onResetClick = async () => {
		this.props.resetGame();
		await wait(); // trigger render twice, so the animations will play
		this.props.startGame();
	};

	onRewindMoveClick = () => {
		this.props.rewindMove();
	};

	componentWillMount() {
		this.props.startGame();
	}

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
				<ScorePanel player1Wins={1} player2Wins={1} draw={0}/>
				<div className="app-board-viewport">
					{started && <Board boardSize={boardSize} board={board} completed={completed} onCellClick={this.onCellClick}/>}
					{completed && <EndGameScreen draw={draw} winner={winner} completed={completed}/>}
				</div>
				<BoardActions>
					<BoardActionButton onClick={this.onResetClick}>RESTART</BoardActionButton>
					{!completed && <BoardActionButton onClick={this.onRewindMoveClick}>REWIND</BoardActionButton>}
				</BoardActions>
			</div>
		);
	}
}

App.propTypes = {
	movePiece: PropTypes.func.isRequired,
	checkCompletedGame: PropTypes.func.isRequired,
	resetGame: PropTypes.func.isRequired,
	startGame: PropTypes.func.isRequired,
	rewindMove: PropTypes.func.isRequired,
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
		startGame,
		rewindMove
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
