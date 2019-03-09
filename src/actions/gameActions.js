import * as ActionTypes from 'constants/ActionTypes';
import { gameStateSelector } from 'selectors/selectors';

export const initGame = ({ boardSize }) => {
	return {
		type: ActionTypes.INIT_GAME,
		boardSize
	};
};

export const resetGame = () => {
	return {
		type: ActionTypes.RESET_GAME
	};
};

export const rewindMove = () => {
	return {
		type: ActionTypes.REWIND_MOVE
	};
};

export const createMovePiece = ({ player, x, y }) => {
	return {
		type: ActionTypes.MOVE_PIECE,
		piece: {
			player,
			x,
			y
		}
	};
};

export const completeGame = ({ winner = null, draw = false } = {}) => {
	return {
		type: ActionTypes.COMPLETE_GAME,
		winner,
		draw
	};
};

export const movePiece = ({ player, x, y }) => (dispatch, getState) => {
	const gameState = gameStateSelector(getState());

	const { board, boardSize } = gameState;
	const piece = board[x + y * boardSize];
	if (piece !== null) {
		return;
	}

	dispatch(createMovePiece({ player, x, y }));
};

export const checkCompletedGame = () => (dispatch, getState) => {
	const gameState = gameStateSelector(getState());
	const { board, boardSize, moves } = gameState;

	if (moves.length === 0) {
		// nothing
		return;
	}
	const lastMove = moves[moves.length - 1];
	const { player } = lastMove;

	// check vertical
	for (let i = 0; i < boardSize; ++i) {
		const piece = board[i * boardSize + lastMove.x];
		if (piece === null || piece.player !== player) {
			break;
		}
		if (i === boardSize - 1) {
			dispatch(completeGame({
				winner: player
			}));
			return;
		}
	}

	// Check horizontal
	for (let i = 0; i < boardSize; ++i) {
		const piece = board[i + lastMove.y * boardSize];
		if (piece === null || piece.player !== player) {
			break;
		}
		if (i === boardSize - 1) {
			dispatch(completeGame({
				winner: player
			}));
			return;
		}
	}

	// Check diagonals
	// the current move must be on one the square of the diagonal
	// top left to right bottom diagonal
	if (lastMove.x === lastMove.y) {
		for (let i = 0; i < boardSize; ++i) {
			const piece = board[i + i * boardSize];
			if (piece === null || piece.player !== player) {
				break;
			}
			if (i === boardSize - 1) {
				dispatch(completeGame({
					winner: player
				}));
				return;
			}
		}
	}
	// top right to bottom left diagonal
	if (lastMove.x === boardSize - 1 - lastMove.y) {
		for (let i = 0; i < boardSize; ++i) {
			const piece = board[(boardSize - 1 - i) + i * boardSize];
			if (piece === null || piece.player !== player) {
				break;
			}
			if (i === boardSize - 1) {
				dispatch(completeGame({
					winner: player
				}));
				return;
			}
		}
	}

	// Check draw
	if (moves.length === boardSize * boardSize) {
		dispatch(completeGame({
			draw: true
		}));
		return;
	}

	// Game continues here
};