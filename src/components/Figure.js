import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const mapPieceFigure = [
	<svg aria-label="X" role="img" viewBox="0 0 128 128">
		<path d="M16,16L112,112" stroke="rgb(66,66,66)" strokeWidth="16px"></path>
		<path d="M112,16L16,112" stroke="rgb(66,66,66)" strokeWidth="16px"></path>
	</svg>,
	<svg aria-label="O" role="img" viewBox="0 0 128 128">
		<path className="hFJ9Ve" d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"
			  stroke="rgb(201, 175, 152)" strokeWidth="16px" fill="none"></path>
	</svg>
];

function Figure({ player, className }) {
	const classname = classnames('figure', className);
	return (
		<span className={classname}>{mapPieceFigure[player - 1]}</span>
	);
}

Figure.propTypes = {
	player: PropTypes.number.isRequired,
	className: PropTypes.string
};

export default Figure;