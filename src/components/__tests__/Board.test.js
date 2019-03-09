import React from 'react';
import { shallow, mount } from 'enzyme';
import Board from '../Board';
import BoardCell from '../BoardCell';
import BoardRow from '../BoardRow';


describe('<Board/>', () => {
	it('should render the board', () => {
		const board = [null, null, null, null];
		const boardSize = 2;
		const renderedComponent = shallow(<Board board={board} boardSize={boardSize}/>);
		expect(renderedComponent.find(BoardCell)).toHaveLength(4);
		expect(renderedComponent.find(BoardRow)).toHaveLength(2);
	});

	it('should handle cell click', () => {
		const board = [null, null, null, null];
		const boardSize = 2;
		const clickStub = jest.fn();
		const renderedComponent = mount(<Board boardSize={boardSize} board={board} onCellClick={clickStub}/>);
		renderedComponent.find(BoardCell).at(2).prop('onClick')();
		expect(clickStub).toHaveBeenCalledWith(expect.objectContaining({
			x: 0, y: 1
		}));
	});

	it('should be in read mode when game completed', () => {
		const board = [null, null, null, null];
		const boardSize = 2;
		const clickStub = jest.fn();
		const renderedComponent = mount(<Board boardSize={boardSize} board={board} completed={true} onCellClick={clickStub}/>);
		renderedComponent.find(BoardCell).at(2).prop('onClick')();
		expect(clickStub).not.toHaveBeenCalled();
	});
});
