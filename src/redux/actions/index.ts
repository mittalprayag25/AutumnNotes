import {createActions} from 'redux-actions';
import NotesAction from './NotesAction';
import CategoryAction from './CategoryAction';

const actions: any = createActions({
  NOTES: NotesAction,
  CATEGORIES: CategoryAction,
});

export default actions;
