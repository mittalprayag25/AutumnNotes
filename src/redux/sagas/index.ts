import {all, fork} from 'redux-saga/effects';

import {watchNotesSaga} from './notesSaga';

export default function* root() {
  yield all([fork(watchNotesSaga)]);
}
