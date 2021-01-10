import {fork} from 'redux-saga/effects';

import appSagas from './app/appSagas';

/**
 * rootSaga
 */
export default function* root() {
  yield fork(appSagas);
}
