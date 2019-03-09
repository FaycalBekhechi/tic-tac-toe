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
});