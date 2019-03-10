import { createSelector } from 'reselect';

export const gameStateSelector = state => state.game;

export const currentPlayer = createSelector(
	[gameStateSelector],
	gameState => {
		const { moves } = gameState;
		return moves.length === 0 ? 1 : (moves[moves.length - 1].player % 2) + 1
	}
);

export const gameCompleted = createSelector(
	[gameStateSelector],
	gameState => {
		return gameState.draw === true || gameState.winner !== null;
	}
);

export const gameStarted = createSelector(
	[gameStateSelector],
	gameState => {
		return gameState.boardSize > 0;
	}
);