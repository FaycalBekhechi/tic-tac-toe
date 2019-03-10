import React from 'react';
import { shallow } from 'enzyme';
import ScorePanel from '../ScorePanel';


describe('<ScorePanel/>', () => {
	it('should render the score panel', () => {
		const renderedComponent = shallow(<ScorePanel player1Wins={88} player2Wins={12} draw={0}/>);
		expect(renderedComponent.find('.score')).toHaveLength(3);
	});
});
