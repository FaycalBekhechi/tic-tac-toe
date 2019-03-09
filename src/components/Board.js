import React from 'react';
import PropTypes from 'prop-types';
import BoardCell from './BoardCell';
import BoardRow from './BoardRow';

function Board({ boardSize, board, onCellClick, completed }) {
	const renderBoard = () => {
		return board.reduce((rows, piece, index) => {
			if (index % boardSize === 0) {
				rows.push([]);
			}
			rows[rows.length - 1].push(
				<BoardCell key={index} piece={piece} readonly={completed} onClick={() => onCellClick({ x: index % boardSize, y: Math.floor(index / boardSize) })}/>
			);
			return rows;
		}, []);
	};

	return (
		<div>
			{renderBoard().map((row, index) => (
				<BoardRow key={index}>
					{row}
				</BoardRow>
			))}
		</div>
	);
}

Board.propTypes = {
	boardSize: PropTypes.number.isRequired,
	board: PropTypes.array.isRequired,
	onCellClick: PropTypes.func,
	completed: PropTypes.bool
};

export default Board;
