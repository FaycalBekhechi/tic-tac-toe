import * as Selectors from '../selectors';

describe('selectors', () => {
	let state;
	beforeEach(() => {
		state = {
			game: {}
		};
	});

	it('should select the game state', () => {
		const actualState = {
			game: {
				board: [null, null],
				moves: []
			}
		};
		const expected = {
			board: [null, null],
			moves: []
		};
		expect(Selectors.gameStateSelector(actualState)).toEqual(expected);
	});

	it('should select player 1', () => {
		const actualState = {
			game: {
				moves: []
			}
		};
		const expected = 1;
		expect(Selectors.currentPlayer(actualState)).toEqual(expected);
	});

	it('should select player 2', () => {
		const actualState = {
			game: {
				moves: [{ player: 1, x: 0, y: 0 }, { player: 2, x: 1, y: 1 }, { player: 1, x: 2, y: 0 }]
			}
		};
		const expected = 2;
		expect(Selectors.currentPlayer(actualState)).toEqual(expected);
	});

	it('should select that the game is completed', () => {
		const actualState = {
			game: {
				winner: null,
				draw: true
			}
		};
		const expected = true;
		expect(Selectors.gameCompleted(actualState)).toEqual(expected);
	});

	it('should select that the game is not completed', () => {
		const actualState = {
			game: {
				winner: null,
				draw: false
			}
		};
		const expected = false;
		expect(Selectors.gameCompleted(actualState)).toEqual(expected);
	});

	it('should select that the game is not started', () => {
		const actualState = {
			game: {
				started: false
			}
		};
		const expected = false;
		expect(Selectors.gameStarted(actualState)).toEqual(expected);
	});

	it('should select that the game is started', () => {
		const actualState = {
			game: {
				started: true
			}
		};
		const expected = true;
		expect(Selectors.gameStarted(actualState)).toEqual(expected);
	});
});