import {combineReducers} from 'redux';

import NotesReducer from './NotesReducer';
import CategoryReducer from './CategoryReducer';

const rootReducer = combineReducers({
  notes: NotesReducer,
  categories: CategoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
