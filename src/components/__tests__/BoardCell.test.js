import React from 'react';
import { mount } from 'enzyme';
import BoardCell from "../BoardCell";

describe('<BoardCell/>', () => {
	it('should render a <div> tag', () => {
		const renderedComponent = mount(<BoardCell/>);
		expect(renderedComponent.find('div')).toHaveLength(1);
	});

	it('should handle click', () => {
		const clickStub = jest.fn();
		const renderedComponent = mount(<BoardCell onClick={clickStub}/>);
		renderedComponent.find('div').simulate('click');
		expect(clickStub).toHaveBeenCalled();
	});
});