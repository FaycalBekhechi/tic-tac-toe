import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import * as ActionTypes from 'constants/ActionTypes';
import * as GameActions from '../gameActions';

const mockStore = configureMockStore([thunk]);

describe('Game actions creators', () => {
	it('should create init game action', () => {
		const actual = GameActions.initGame({ boardSize: 4 });
		const expected = {
			type: ActionTypes.INIT_GAME,
			boardSize: 4
		};
		expect(actual).toEqual(expected);
	});

	it('should create reset game action', () => {
		const actual = GameActions.resetGame({});
		const expected = {
			type: ActionTypes.RESET_GAME
		};
		expect(actual).toEqual(expected);
	});

	it('should create rewind move action', () => {
		const actual = GameActions.rewindMove({});
		const expected = {
			type: ActionTypes.REWIND_MOVE
		};
		expect(actual).toEqual(expected);
	});

	it('should create move action', () => {
		const actual = GameActions.createMovePiece({ player: 1, x: 1, y: 1 });
		const expected = {
			type: ActionTypes.MOVE_PIECE,
			player: 1,
			x: 1,
			y: 1
		};
		expect(actual).toEqual(expected);
	});

	it('should create draw game complete action', () => {
		const actual = GameActions.completeGame({ draw: true });
		const expected = {
			type: ActionTypes.COMPLETE_GAME,
			winner: null,
			draw: true
		};
		expect(actual).toEqual(expected);
	});

	it('should create winner game complete action', () => {
		const actual = GameActions.completeGame({ winner: 2 });
		const expected = {
			type: ActionTypes.COMPLETE_GAME,
			winner: 2,
			draw: false
		};
		expect(actual).toEqual(expected);
	});
});

describe('Game actions', () => {
	it('should not create an action on an invalid move', async () => {
		const state = {
			game: {
				moves: [
					{ player: 1, x: 0, y: 0 },
					{ player: 2, x: 0, y: 1 }
				],
				board: [
					{ player: 1 }, null, null,
					{ player: 2 }, null, null,
					null, null, null
				],
				boardSize: 3,
				winner: null,
				draw: false
			}
		};

		const store = mockStore(state);
		await store.dispatch(GameActions.movePiece({ player: 1, x: 0, y: 1 }));
		const actions = store.getActions();
		expect(actions).toEqual([]);
	});

	it('should dispatch a complete game action with player 1 as a winner', async () => {
		const state = {
			game: {
				moves: [
					{ player: 1, x: 0, y: 0 },
					{ player: 2, x: 0, y: 1 },
					{ player: 1, x: 1, y: 1 },
					{ player: 2, x: 2, y: 2 },
					{ player: 1, x: 2, y: 0 },
					{ player: 2, x: 1, y: 0 },
					{ player: 1, x: 0, y: 2 }
				],
				board: [
					{ player: 1 }, { player: 2 }, { player: 1 },
					{ player: 2 }, { player: 1 }, null,
					{ player: 1 }, null, { player: 2 }
				],
				boardSize: 3,
				winner: null,
				draw: false
			}
		};
		const store = mockStore(state);
		await store.dispatch(GameActions.checkCompletedGame());
		const actions = store.getActions();
		const expected = {
			type: ActionTypes.COMPLETE_GAME,
			winner: 1,
			draw: false
		};
		expect(actions[0]).toEqual(expected);
	});

});