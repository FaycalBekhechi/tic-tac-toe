import * as ActionTypes from 'constants/ActionTypes';

const initialState = {
	moves: [],
	board: [],
	boardSize: 0,
	winner: null,
	draw: false
};

function movePiece(state, piece) {
	const { boardSize } = state;
	const board = [...state.board];
	board[piece.x + piece.y * boardSize] = { player: piece.player };
	const moves = [...state.moves, piece];
	return {
		...state,
		board,
		moves
	};
}

function rewindMove(state) {
	const { moves } = state;
	if (moves.length === 0) {
		return state;
	}
	const { boardSize } = state;
	const lastMove = moves[moves.length - 1];
	const presentMoves = moves.slice(0, -1);
	const board = [...state.board];
	board[lastMove.x + lastMove.y * boardSize] = null;
	return {
		...state,
		moves: presentMoves,
		board
	};
}

export default function gameReducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.INIT_GAME:
			return {
				...state,
				board: Array(action.boardSize * action.boardSize).fill(null),
				boardSize: action.boardSize
			};
		case ActionTypes.RESET_GAME:
			return initialState;
		case ActionTypes.COMPLETE_GAME:
			return {
				...state,
				winner: action.winner,
				draw: action.draw
			};
		case ActionTypes.MOVE_PIECE:
			return movePiece(state, action.piece);
		case ActionTypes.REWIND_MOVE:
			return rewindMove(state);
		default:
			return state;
	}
}