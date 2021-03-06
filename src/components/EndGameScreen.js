import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Figure from './Figure';

function EndGameScreen({ winner, draw }) {
	let message;
	let figures;
	if (draw === true) {
		message = 'DRAW!';
		figures = [<Figure key={1} player={1}/>, <Figure key={2} player={2}/>]
	} else {
		message = 'IS WINNER!';
		figures = <Figure player={winner}/>;
	}
	const className = classnames({
		'end-game-screen': true
	});
	return (
		<div className={className}>
			<div className="end-game-screen-figures">{figures}</div>
			<div className="end-game-screen-message">{message}</div>
		</div>
	);
}

EndGameScreen.propTypes = {
	winner: PropTypes.number,
	draw: PropTypes.bool
};

export default EndGameScreen;