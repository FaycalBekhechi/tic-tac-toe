import React from 'react';
import PropTypes from 'prop-types';

const mapPieceFigure = ['X', 'O'];

function BoardCell({ piece, onClick }) {
	return (
		<div className="board-cell" onClick={onClick}>{ piece && mapPieceFigure[piece.player - 1] }</div>
	);
}

BoardCell.propTypes = {
	piece: PropTypes.object,
	onClick: PropTypes.func
};

export default BoardCell;