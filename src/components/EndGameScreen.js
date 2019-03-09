import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';

function EndGameScreen({ winner, draw }) {
	let message;
	let figures;
	if (draw === true) {
		message = 'DRAW!';
		figures = [<Figure key={1} player={1}/>,<Figure key={2} player={2}/>]
	} else {
		message = 'IS WINNER!';
		figures = <Figure player={winner}/>;
	}
	return (
		<div>
			<div>{figures}</div>
			<div>{message}</div>
		</div>
	);
}

EndGameScreen.propTypes = {
	winner: PropTypes.number,
	draw: PropTypes.bool
};

export default EndGameScreen;