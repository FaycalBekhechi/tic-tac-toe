import { combineReducers } from 'redux';
import gameReducer from './gameReducer';

export default function createReducer() {
	return combineReducers({
		game: gameReducer
	});
}
