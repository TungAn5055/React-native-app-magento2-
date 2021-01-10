import {takeLatest, call, put} from 'redux-saga/effects';
import {GET_LIST_ORDER} from '../../constants';
import {actionSetListOrder} from './appActions';
import axios from 'axios';

function* getOrderList({storeId}) {
  let data = {};
  console.log('ann13333');
  console.log(storeId);
  const requestURL =
    '/rest/V1/orders?searchCriteria[filter_groups][0][filters][0][field]=store_id& searchCriteria[filter_groups][0][filters][0][value]=' +
    storeId +
    '& searchCriteria[filter_groups][0][filters][0][condition_type]=like&fields=items[increment_id,entity_id]';
  yield axios
    .get(requestURL, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (res.status === 200) {
        console.log('ann123');
        console.log(res);
        data = res.data;
      }
    });
  yield put(actionSetListOrder(data));
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(GET_LIST_ORDER, getOrderList);
}
