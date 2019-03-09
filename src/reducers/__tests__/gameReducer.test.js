import gameReducer from '../gameReducer';
import * as ActionTypes from 'constants/ActionTypes';

describe('gameReducer', () => {
	let state;
	beforeEach(() => {
		state = {
			moves: [],
			board: [],
			boardSize: 0,
			winner: null,
			draw: false
		};
	});

	it('should return the default state', () => {
		const expected = state;
		expect(gameReducer(undefined, {})).toMatchObject(expected);
	});

	it('should return the correct board state when dispatching some actions', () => {
		const actions = [
			{},
			{ type: ActionTypes.INIT_GAME, boardSize: 3 },
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

	it('should return the initial state when resetting the game', () => {
		const action = { type: ActionTypes.RESET_GAME };
		const actualState = {
			moves: [],
			board: [
				null, null, null,
				null, null, null,
				null, null, null
			],
			boardSize: 3,
			winner: null,
			draw: false
		};
		const expected = state;
		expect(gameReducer(actualState, action)).toMatchObject(expected);
	});

	it('should return the state with player 1 winning', () => {
		const action = { type: ActionTypes.COMPLETE_GAME, winner: 1, draw: false };
		const actualState = {
			board: [
				{ player: 1 }, { player: 2 }, null,
				{ player: 2 }, { player: 1 }, null,
				{ player: 2 }, { player: 1 }, { player: 1 }
			],
			winner: null
		};
		const expected = {
			board: [
				{ player: 1 }, { player: 2 }, null,
				{ player: 2 }, { player: 1 }, null,
				{ player: 2 }, { player: 1 }, { player: 1 }
			],
			winner: 1
		};
		expect(gameReducer(actualState, action)).toMatchObject(expected);
	});
});