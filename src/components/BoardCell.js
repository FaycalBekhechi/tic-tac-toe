import React from 'react';
import PropTypes from 'prop-types';

const mapPieceFigure = ['X', 'O'];

function BoardCell({ piece, onClick, readonly }) {
	return (
		<div className="board-cell" onClick={() => !readonly && onClick()}>{ piece && mapPieceFigure[piece.player - 1] }</div>
	);
}

BoardCell.propTypes = {
	piece: PropTypes.object,
	onClick: PropTypes.func,
	readonly: PropTypes.bool
};

export default BoardCell;