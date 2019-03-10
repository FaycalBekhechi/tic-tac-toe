import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';

function ScorePanel({ player1Wins, player2Wins, draw }) {
	return (
		<div className="score-panel">
			<div className="player1-score">
				<span className="score-label">PLAYER 1 <Figure player={1} className="score-panel-figure"/></span>
				<span className="score">{player1Wins}</span>
			</div>
			<div className="draw-score">
				<span className="score-label">DRAW</span>
				<span className="score">{draw}</span>
			</div>
			<div className="player2-score">
				<span className="score-label">PLAYER 2 <Figure player={2} className="score-panel-figure"/></span>
				<span className="score">{player2Wins}</span>
			</div>
		</div>
	);
}

ScorePanel.propTypes = {
	player1Wins: PropTypes.number.isRequired,
	player2Wins: PropTypes.number.isRequired,
	draw: PropTypes.number.isRequired

};

export default ScorePanel;
