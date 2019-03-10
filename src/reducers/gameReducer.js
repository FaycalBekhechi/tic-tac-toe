import * as ActionTypes from 'constants/ActionTypes';

const initialState = {
	started: false,
	moves: [],
	board: [],
	boardSize: 0,
	winner: null,
	draw: false,
	scores: {
		player1: 0,
		player2: 0,
		draw: 0
	}
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
		case ActionTypes.CONFIGURE_GAME:
			return {
				...state,
				started: false,
				moves: [],
				board: Array(action.boardSize * action.boardSize).fill(null),
				boardSize: action.boardSize,
				winner: null,
				draw: false
			};
		case ActionTypes.START_GAME:
			return {
				...state,
				started: true
			};
		case ActionTypes.RESET_GAME:
			return {
				...state,
				started: false,
				moves: [],
				board: state.board.slice().fill(null),
				winner: null,
				draw: false
			};
		case ActionTypes.COMPLETE_GAME:
			return {
				...state,
				winner: action.winner,
				draw: action.draw,
				scores: {
					player1: action.winner === 1 ? state.scores.player1 + 1 : state.scores.player1,
					player2: action.winner === 2 ? state.scores.player2 + 1 : state.scores.player2,
					draw: action.draw === true ? state.scores.draw + 1 : state.scores.draw
				}
			};
		case ActionTypes.MOVE_PIECE:
			return movePiece(state, action.piece);
		case ActionTypes.REWIND_MOVE:
			return rewindMove(state);
		default:
			return state;
	}
}