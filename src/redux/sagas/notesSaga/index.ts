import AsyncStorage from '@react-native-community/async-storage';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {navigate} from './../../../navigators/RootNavigation';
import {Routes} from '../../../constants/NavigationUtils';
import actions from '../../actions';

function* getAllNotes() {
  try {
    const response = yield call(pullNotesFromAsyncStorage);
    const notes = response ? response : [];
    yield put(actions.notes.success(JSON.parse(notes)));
  } catch (error) {
    yield put(actions.notes.error());
  }
}

function* getAllCategories() {
  try {
    const categories = yield call(pullCategoriesFromAsyncStorage);
    yield put(actions.categories.success(JSON.parse(categories)));
  } catch (error) {
    yield put(actions.categories.error());
  }
}

function* deleteNote(action: any): any {
  try {
    const index = action.payload;
    const {allNotes} = yield select(s => s.notes);
    allNotes.splice(index, 1);
    yield call(updateNoteList, allNotes);
    yield put(actions.notes.success(allNotes));
    yield call(navigate, Routes.HOMESCREEN, {});
  } catch (error) {}
}

function* editNote(action: any): any {
  try {
    const index = action.payload.index;
    const note = action.payload.note;
    const {allNotes} = yield select(s => s.notes);
    allNotes.splice(index, 1, note);
    yield call(updateNoteList, allNotes);
    yield put(actions.notes.success(allNotes));
    yield call(navigate, Routes.HOMESCREEN, {});
  } catch (error) {}
}

function* createNote(action: any): any {
  try {
    const data = yield call(pullNotesFromAsyncStorage);
    const notes = data ? JSON.parse(data) : [];

    const newNote = action.payload.note;
    notes.unshift(newNote);

    yield call(updateNoteList, notes);

    yield put(actions.notes.success(notes));

    yield call(navigate, Routes.HOMESCREEN, {});
  } catch (error) {}
}

function* createCategory(action: any): any {
  try {
    const data = yield call(pullCategoriesFromAsyncStorage);
    const categories = data ? JSON.parse(data) : [];

    const newCategory = action.payload.category;
    categories.unshift(newCategory);

    yield call(updateCategoriesList, categories);
    yield put(actions.categories.success(categories));
  } catch (error) {
    yield put(actions.categories.error());
  }
}

function* deleteCategory(action: any): any {
  try {
    const index = action.payload;
    const {categories} = yield select(s => s.categories);
    categories.splice(index, 1);
    yield call(updateCategoriesList, categories);
    yield put(actions.categories.success(categories));
  } catch (error) {}
}

async function pullNotesFromAsyncStorage() {
  return await AsyncStorage.getItem('NOTES');
}

async function pullCategoriesFromAsyncStorage() {
  return await AsyncStorage.getItem('CATEGORIES');
}

async function updateNoteList(noteList) {
  return await AsyncStorage.setItem('NOTES', JSON.stringify(noteList));
}

async function updateCategoriesList(categoriesList) {
  return await AsyncStorage.setItem(
    'CATEGORIES',
    JSON.stringify(categoriesList),
  );
}

export function* watchNotesSaga() {
  yield takeLatest(actions.notes.allnotes, getAllNotes);
  yield takeLatest(actions.notes.deletenote, deleteNote);
  yield takeLatest(actions.notes.editnote, editNote);
  yield takeLatest(actions.notes.createnote, createNote);
  yield takeLatest(actions.categories.createcategory, createCategory);
  yield takeLatest(actions.categories.deletecategory, deleteCategory);
  yield takeLatest(actions.categories.allcategories, getAllCategories);
}
