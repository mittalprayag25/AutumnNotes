import {expectSaga} from 'redux-saga-test-plan';

import notesMock from './../../../mocks/notesMockData';
import actions from '../../../actions';
import CategoryReducer from '../../../reducers/CategoryReducer';
import NotesReducer from '../../../reducers/NotesReducer';
import initialState from '../../../store/initialState';
import {watchNotesSaga} from '..';

describe('Notes Saga => getAllNotes', () => {
  it('getAllNotes success', () => {
    return expectSaga(watchNotesSaga)
      .provide({
        call({fn}, next) {
          return Promise.resolve(notesMock.NOTES);
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            notes: {allNotes: []},
          });
        },
      })
      .hasFinalState({
        ...initialState.notes,
        allNotes: JSON.parse(notesMock.NOTES),
      })
      .withReducer(NotesReducer, initialState.notes)
      .dispatch(actions.notes.allnotes())
      .run({silenceTimeout: true});
  });
  it('getAllNotes failure', () => {
    return expectSaga(watchNotesSaga)
      .provide({
        call({fn}, next) {
          return Promise.reject(notesMock.NOTES);
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            notes: {allNotes: []},
          });
        },
      })
      .hasFinalState({
        ...initialState.notes,
        allNotes: [],
      })
      .withReducer(NotesReducer, initialState.notes)
      .dispatch(actions.notes.allnotes())
      .run({silenceTimeout: true});
  });
});

describe('Notes Saga => createNote', () => {
  it('Create Note success', () => {
    return expectSaga(watchNotesSaga)
      .provide({
        call({fn}, next) {
          return Promise.resolve(notesMock.NOTES);
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            notes: {allNotes: []},
          });
        },
      })
      .hasFinalState({
        ...initialState.notes,
        allNotes: [
          {title: 'hi', description: 'desc', category: 'cat2'},
          {title: 'title1', description: 'description1', category: 'cat1'},
          {title: 'title2', description: 'description', category: 'cat1'},
        ],
      })
      .withReducer(NotesReducer, initialState.notes)
      .dispatch(
        actions.notes.createnote({
          note: {
            title: 'hi',
            description: 'desc',
            category: 'cat2',
          },
        }),
      )
      .run({silenceTimeout: true});
  });
});

describe('Notes Saga => edit notes', () => {
  it('edit Note success', () => {
    return expectSaga(watchNotesSaga)
      .provide({
        call({fn}, next) {
          return Promise.resolve(notesMock.NOTES);
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            notes: {allNotes: []},
          });
        },
      })
      .hasFinalState({
        ...initialState.notes,
        allNotes: [{title: 'hi', description: 'desc3', category: 'cat2'}],
      })
      .withReducer(NotesReducer, initialState.notes)
      .dispatch(
        actions.notes.editnote({
          note: {
            title: 'hi',
            description: 'desc3',
            category: 'cat2',
          },
          index: 0,
        }),
      )
      .run({silenceTimeout: true});
  });
});

describe('Notes Saga => delete notes', () => {
  it('delete Note success', () => {
    return expectSaga(watchNotesSaga)
      .provide({
        call({fn}, next) {
          return Promise.resolve(notesMock.NOTES);
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            notes: {allNotes: JSON.parse(notesMock.NOTES)},
          });
        },
      })
      .hasFinalState({
        ...initialState.notes,
        allNotes: [
          {title: 'title2', description: 'description', category: 'cat1'},
        ],
      })
      .withReducer(NotesReducer, initialState.notes)
      .dispatch(actions.notes.deletenote(0))
      .run({silenceTimeout: true});
  });
});

describe('Notes Saga => createcategory', () => {
  it('Create category success', () => {
    return expectSaga(watchNotesSaga)
      .provide({
        call({fn}, next) {
          return Promise.resolve(notesMock.CATEGORIES);
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            categories: {categories: []},
          });
        },
      })
      .hasFinalState({
        ...initialState.categories,
        categories: [
          {label: 'newVAL', value: 'desc2'},
          {label: 'hi', value: 'desc'},
        ],
      })
      .withReducer(CategoryReducer, initialState.categories)
      .dispatch(
        actions.categories.createcategory({
          category: {
            label: 'newVAL',
            value: 'desc2',
          },
        }),
      )
      .run({silenceTimeout: true});
  });
  it('Create category failure', () => {
    return expectSaga(watchNotesSaga)
      .provide({
        call({fn}, next) {
          return Promise.reject();
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            categories: {categories: []},
          });
        },
      })
      .hasFinalState({
        ...initialState.categories,
        categories: [],
      })
      .withReducer(CategoryReducer, initialState.categories)
      .dispatch(
        actions.categories.createcategory({
          category: {
            label: 'newVAL',
            value: 'desc2',
          },
        }),
      )
      .run({silenceTimeout: true});
  });
});

describe('Notes Saga => deleteCategory', () => {
  it('delete category success', () => {
    return expectSaga(watchNotesSaga)
      .provide({
        call({fn}, next) {
          return Promise.resolve(notesMock.CATEGORIES);
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            categories: {categories: []},
          });
        },
      })
      .hasFinalState({
        ...initialState.categories,
        categories: [],
      })
      .withReducer(CategoryReducer, initialState.categories)
      .dispatch(
        actions.categories.deletecategory({
          category: {
            label: 'newVAL',
            value: 'desc2',
          },

          index: 0,
        }),
      )
      .run({silenceTimeout: true});
  });
});

describe('Notes Saga => all categories', () => {
  it('delete category success', () => {
    return expectSaga(watchNotesSaga)
      .provide({
        call({fn}, next) {
          return Promise.resolve(notesMock.CATEGORIES);
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            categories: {},
          });
        },
      })
      .hasFinalState({
        ...initialState.categories,
        categories: JSON.parse(notesMock.CATEGORIES),
      })
      .withReducer(CategoryReducer, initialState.categories)
      .dispatch(actions.categories.allcategories())
      .run({silenceTimeout: true});
  });
  it('delete category failure', () => {
    return expectSaga(watchNotesSaga)
      .provide({
        call({fn}, next) {
          return Promise.reject(notesMock.CATEGORIES);
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            categories: {},
          });
        },
      })
      .hasFinalState({
        ...initialState.categories,
        categories: [],
      })
      .withReducer(CategoryReducer, initialState.categories)
      .dispatch(actions.categories.allcategories())
      .run({silenceTimeout: true});
  });
});
