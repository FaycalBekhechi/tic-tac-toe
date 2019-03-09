import gameReducer from '../gameReducer';
import * as ActionTypes from 'constants/ActionTypes';

describe('gameReducer', () => {
	let state;
	beforeEach(() => {
		state = {
			board: [],
			winner: null
		};
	});

	it('should return the default state', () => {
		const expected = state;
		expect(gameReducer(undefined, {})).toEqual(expected);
	});

	it('should return the correct board state when dispatching some actions', () => {
		const actions = [
			{},
			{ type: ActionTypes.INIT_GAME, boardSize: 3 },
			{ type: ActionTypes.CHECK_COMPLETED_GAME },
			{ type: ActionTypes.MOVE_PIECE, piece: { player: 1, x: 2, y: 0 } },
			{ type: ActionTypes.CHECK_COMPLETED_GAME },
			{ type: ActionTypes.MOVE_PIECE, piece: { player: 2, x: 2, y: 1 } },
			{ type: ActionTypes.CHECK_COMPLETED_GAME },
			{ type: ActionTypes.MOVE_PIECE, piece: { player: 1, x: 1, y: 1 } },
			{ type: ActionTypes.CHECK_COMPLETED_GAME },
			{ type: ActionTypes.MOVE_PIECE, piece: { player: 2, x: 2, y: 0 } },
			{ type: ActionTypes.REWIND_MOVE }
		];

		const actualState = actions.reduce((state, action) => {
			return gameReducer(state, action);
		}, undefined);
		const expected = {
			board: [
				null, null, { player: 1 },
				null, null, { player: 2 },
				null, null, null
			]
		};
		expect(actualState).toEqual(expected);
	});

	it('should return the initial state when resetting the game', () => {
		const action = { type: ActionTypes.RESET_GAME };
		const actualState = {
			board: [
				null, { player: 1 }, null,
				{ player: 2 }, null, null,
				{ player: 2 }, { player: 1 }, null
			],
			winner: null
		};
		const expected = {
			board: []
		};
		expect(gameReducer(actualState, action)).toEqual(expected);
	});

	it('should return the state with player 1 winning', () => {
		const action = { type: ActionTypes.CHECK_COMPLETED_GAME };
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
		expect(gameReducer(actualState, action)).toEqual(expected);
	});
});