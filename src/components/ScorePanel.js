import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Figure from './Figure';

function ScorePanel({ player1Wins, player2Wins, draw, currentPlayer }) {
	return (
		<div className="score-panel">
			<div className="player-score">
				<span className={classnames('player-score-cursor', {'player-score-cursor-show': currentPlayer === 1})}/>
				<span className="score-label">PLAYER 1 <Figure player={1} className="score-panel-figure"/></span>
				<span className="score">{player1Wins}</span>
			</div>
			<div className="player-score">
				<span className="player-score-cursor"/>
				<span className="score-label">DRAW</span>
				<span className="score">{draw}</span>
			</div>
			<div className="player-score">
				<span className={classnames('player-score-cursor', {'player-score-cursor-show': currentPlayer === 2})}/>
				<span className="score-label">PLAYER 2 <Figure player={2} className="score-panel-figure"/></span>
				<span className="score">{player2Wins}</span>
			</div>
		</div>
	);
}

ScorePanel.propTypes = {
	player1Wins: PropTypes.number.isRequired,
	player2Wins: PropTypes.number.isRequired,
	draw: PropTypes.number.isRequired,
	currentPlayer: PropTypes.number

};

export default ScorePanel;
