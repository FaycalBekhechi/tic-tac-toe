import { createSelector } from 'reselect';

export const gameStateSelector = state => state.game;

export const currentPlayer = createSelector(
	[gameStateSelector],
	gameState => {
		const { moves } = gameState;
		return moves.length === 0 ? 1 : (moves[moves.length - 1].player % 2) + 1
	}
);