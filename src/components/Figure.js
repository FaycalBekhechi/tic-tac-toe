import React from 'react';
import PropTypes from 'prop-types';

const mapPieceFigure = ['X', 'O'];

function Figure({ player }) {
	return (
		<span>{ mapPieceFigure[player - 1] }</span>
	);
}

Figure.propTypes = {
	player: PropTypes.number.isRequired
};

export default Figure;