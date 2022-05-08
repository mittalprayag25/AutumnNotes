import Home from '../containers/Home';

import Note from '../containers/Note';
import NoteDetail from '../containers/NoteDetail';
import Category from '../containers/Category';

const screenMap = {
  HomeScreen: {
    screen: Home,
  },
  Note: {
    screen: Note,
  },
  NoteDetail: {
    screen: NoteDetail,
  },
  Category: {
    screen: Category,
  },
};

export default screenMap;
