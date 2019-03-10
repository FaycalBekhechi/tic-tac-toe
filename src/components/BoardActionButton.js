import React from 'react';
import PropTypes from 'prop-types';

function BoardActionButton({ children, onClick }) {
	return (
		<span className="board-action-button" onClick={onClick}>{children}</span>
	);
}

BoardActionButton.propTypes = {
	onClick: PropTypes.func
};

export default BoardActionButton;