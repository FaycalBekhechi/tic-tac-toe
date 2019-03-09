import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { movePiece, checkCompletedGame } from 'actions/gameActions';
import { gameStateSelector, currentPlayer } from 'selectors/selectors';
import BoardHeader from "components/BoardHeader";
import Board from "../components/Board";
import BoardActions from "components/BoardActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export class App extends React.Component {
	onCellClick = ({ x, y }) => {
		const { currentPlayer: player } = this.props;
		this.props.movePiece({ player, x, y });
		this.props.checkCompletedGame();
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
		const { board, boardSize } = this.props;
		return (
			<div className="App">
				<BoardHeader/>
				<Board boardSize={boardSize} board={board} onCellClick={this.onCellClick}/>
				<BoardActions/>
			</div>
		);
	}
}

App.propTypes = {
	movePiece: PropTypes.func.isRequired,
	checkCompletedGame: PropTypes.func.isRequired,
	boardSize: PropTypes.number.isRequired,
	board: PropTypes.array.isRequired,
	currentPlayer: PropTypes.number.isRequired
};

function mapStateToProps(state) {
	const gameState = gameStateSelector(state);
	const player = currentPlayer(state);
	return {
		boardSize: gameState.boardSize,
		board: gameState.board,
		currentPlayer: player
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		movePiece,
		checkCompletedGame
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
