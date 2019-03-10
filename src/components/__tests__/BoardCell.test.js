import React from 'react';
import { mount } from 'enzyme';
import BoardCell from '../BoardCell';

describe('<BoardCell/>', () => {
	it('should render a <div> tag', () => {
		const renderedComponent = mount(<BoardCell/>);
		expect(renderedComponent.find('div.board-cell')).toHaveLength(1);
	});

	it('should handle click', () => {
		const clickStub = jest.fn();
		const renderedComponent = mount(<BoardCell onClick={clickStub}/>);
		renderedComponent.find('div').at(0).simulate('click');
		expect(clickStub).toHaveBeenCalled();
	});

	it('should not handle click', () => {
		const clickStub = jest.fn();
		const renderedComponent = mount(<BoardCell onClick={clickStub} readonly={true}/>);
		renderedComponent.find('div').at(0).simulate('click');
		expect(clickStub).not.toHaveBeenCalled();
	});
});