import React from 'react';
import { mount } from 'enzyme';
import Figure from '../Figure';

describe('<Figure/>', () => {
	it('should render a <span> tag', () => {
		const renderedComponent = mount(<Figure player={1}/>);
		expect(renderedComponent.find('span')).toHaveLength(1);
	});
});