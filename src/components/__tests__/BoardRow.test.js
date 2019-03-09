import React from 'react';
import { mount } from 'enzyme';
import BoardRow from "../BoardRow";
import BoardCell from "../BoardCell";

describe('<BoardRow/>', () => {
	it('should render a children', () => {
		const renderedComponent = mount(
			<BoardRow>
				<BoardCell/>
				<BoardCell/>
				<BoardCell/>
			</BoardRow>
		);
		expect(renderedComponent.find(BoardCell)).toHaveLength(3);
	});
});