import gameReducer from '../gameReducer';
import * as ActionTypes from 'constants/ActionTypes';

describe('gameReducer', () => {
	let state;
	beforeEach(() => {
		state = {
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
	});

	it('should return the default state', () => {
		const expected = state;
		expect(gameReducer(undefined, {})).toMatchObject(expected);
	});

	it('should return the correct initial configuration board state', () => {
		const actualState = gameReducer(state, { type: ActionTypes.CONFIGURE_GAME, boardSize: 3 });
		const expected = {
			...state,
			board: [
				null, null, null,
				null, null, null,
				null, null, null
			],
			boardSize: 3
		};
		expect(actualState).toMatchObject(expected);
	});

	it('should return started game state', () => {
		const expected = {
			...state,
			started: true
		};
		expect(gameReducer(state, { type: ActionTypes.START_GAME })).toMatchObject(expected);
	});

	it('should return the correct board state when dispatching some actions', () => {
		const actions = [
			{},
			{ type: ActionTypes.CONFIGURE_GAME, boardSize: 3 },
			{ type: ActionTypes.START_GAME },
			{ type: ActionTypes.MOVE_PIECE, piece: { player: 1, x: 2, y: 0 } },
			{ type: ActionTypes.MOVE_PIECE, piece: { player: 2, x: 2, y: 1 } },
			{ type: ActionTypes.MOVE_PIECE, piece: { player: 1, x: 1, y: 1 } },
			{ type: ActionTypes.MOVE_PIECE, piece: { player: 2, x: 2, y: 2 } },
			{ type: ActionTypes.REWIND_MOVE },
			{ type: ActionTypes.REWIND_MOVE },
			{ type: ActionTypes.MOVE_PIECE, piece: { player: 1, x: 0, y: 0 } }
		];

		const actualState = actions.reduce((state, action) => {
			return gameReducer(state, action);
		}, undefined);
		const expected = {
			moves: [
				{ player: 1, x: 2, y: 0 },
				{ player: 2, x: 2, y: 1 },
				{ player: 1, x: 0, y: 0 }
			],
			board: [
				{ player: 1 }, null, { player: 1 },
				null, null, { player: 2 },
				null, null, null
			],
			boardSize: 3,
			winner: null,
			draw: false
		};
		expect(actualState).toMatchObject(expected);
	});

	it('should return the state of a new game that\'s not started yet', () => {
		const action = { type: ActionTypes.RESET_GAME };
		const actualState = {
			moves: [{ player: 1, x: 1, y: 0 }],
			board: [
				null, { player: 1 }, null,
				null, null, null,
				null, null, null
			],
			boardSize: 3,
			winner: null,
			draw: false,
			scores: {
				player1: 11,
				player2: 10,
				draw: 22
			}
		};
		const expected = {
			started: false,
			moves: [],
			board: [
				null, null, null,
				null, null, null,
				null, null, null
			],
			boardSize: 3,
			winner: null,
			draw: false,
			scores: {
				player1: 11,
				player2: 10,
				draw: 22
			}
		};
		expect(gameReducer(actualState, action)).toMatchObject(expected);
	});

	it('should return the state with player 1 winning', () => {
		const action = { type: ActionTypes.COMPLETE_GAME, winner: 1, draw: false };
		const actualState = {
			...state,
			started: true,
			moves: [
				{ player: 1, x: 0, y: 0 },
				{ player: 2, x: 1, y: 0 },
				{ player: 1, x: 1, y: 2 },
				{ player: 2, x: 0, y: 1 },
				{ player: 1, x: 1, y: 1 },
				{ player: 2, x: 0, y: 2 },
				{ player: 1, x: 2, y: 2 }
			],
			board: [
				{ player: 1 }, { player: 2 }, null,
				{ player: 2 }, { player: 1 }, null,
				{ player: 2 }, { player: 1 }, { player: 1 }
			],
			boardSize: 3,
			scores: {
				player1: 22,
				player2: 13,
				draw: 41
			}
		};
		const expected = {
			winner: 1,
			draw: false,
			scores: {
				player1: 23,
				player2: 13,
				draw: 41
			}
		};
		expect(gameReducer(actualState, action)).toMatchObject(expected);
	});
});