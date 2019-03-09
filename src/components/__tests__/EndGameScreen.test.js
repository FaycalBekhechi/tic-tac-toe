import React from 'react';
import { mount } from 'enzyme';
import EndGameScreen from '../EndGameScreen';
import Figure from '../Figure';


describe('<EndGameScreen/>', () => {
	it('should render the end game screen with two figures', () => {
		const renderedComponent = mount(<EndGameScreen draw={true} winner={null}/>);
		expect(renderedComponent.find(Figure)).toHaveLength(2);
	});

	it('should render the end game screen with one figure', () => {
		const renderedComponent = mount(<EndGameScreen draw={false} winner={2}/>);
		expect(renderedComponent.find(Figure)).toHaveLength(1);
	});
});
