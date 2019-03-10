import React from 'react';
import { mount } from 'enzyme';
import BoardActionButton from '../BoardActionButton';

describe('<BoardActionButton/>', () => {
	it('should render children', () => {
		const renderedComponent = mount(
			<BoardActionButton>
				<span>something</span>
			</BoardActionButton>
		);
		expect(renderedComponent.contains(<span>something</span>)).toBe(true);
	});

	it('should handle click', () => {
		const clickStub = jest.fn();
		const renderedComponent = mount(
			<BoardActionButton onClick={clickStub}>
				<span>something</span>
			</BoardActionButton>
		);
		renderedComponent.find('span').at(0).simulate('click');
		expect(clickStub).toHaveBeenCalled();
	});
});