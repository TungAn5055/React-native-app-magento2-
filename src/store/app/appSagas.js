import {takeLatest, call, put} from 'redux-saga/effects';
import {GET_LIST_ORDER} from '../../constants';
import {actionSetListOrder} from './appActions';
import axios from 'axios';

function* getOrderList({storeId}) {
  let data = {};
  const requestURL =
    '/rest/V1/orders?searchCriteria[filter_groups][0][filters][0][field]=store_id& searchCriteria[filter_groups][0][filters][0][value]=' +
    storeId +
    '& searchCriteria[filter_groups][0][filters][0][condition_type]=like&searchCriteria[sortOrders][0][field]=created_at&searchCriteria[sortOrders][0][direction]=DESC';
    // '&fields=items[increment_id,entity_id]';
  yield axios
    .get(requestURL, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (res.status === 200) {
        data = res.data;
      }
    });
  yield put(actionSetListOrder(data));
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(GET_LIST_ORDER, getOrderList);
}
