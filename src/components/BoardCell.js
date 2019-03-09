import React from 'react';
import PropTypes from 'prop-types';
import Figure from "./Figure";

function BoardCell({ piece, onClick, readonly }) {
	return (
		<div className="board-cell" onClick={() => !readonly && onClick()}>
			{ piece && <Figure player={piece.player}/> }
		</div>
	);
}

BoardCell.propTypes = {
	piece: PropTypes.object,
	onClick: PropTypes.func,
	readonly: PropTypes.bool
};

export default BoardCell;