import {takeLatest, takeEvery, call, put, all} from 'redux-saga/effects';
import {
  GET_IMAGE_PRODUCT,
  GET_LIST_ORDER,
  SET_DATA_IMAGE,
  GET_DATA_ORDER,
} from '../../constants';
import {actionSetListOrder, actionSetProductMedia} from './appActions';
import axios from 'axios';

function* getOrderList({storeId}) {
  try {
    let data = {};
    const requestURL =
      'rest/V1/orders?searchCriteria[filter_groups][0][filters][0][field]=store_id' +
      '&searchCriteria[filter_groups][0][filters][0][value]=' +
      storeId +
      '&searchCriteria[filter_groups][0][filters][0][condition_type]=like' +
      '&searchCriteria[filter_groups][1][filters][0][field]=status' +
      '&searchCriteria[filter_groups][1][filters][0][value]=pending' +
      '&searchCriteria[filter_groups][1][filters][0][condition_type]=like' +
      '&searchCriteria[sortOrders][0][field]=created_at' +
      '&searchCriteria[sortOrders][0][direction]=DESC';
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
    if (data.items && data.items.length > 0) {
      const listSku = [];
      data.items.forEach((item) => {
        item.items.forEach((it) => {
          if (it.sku) {
            listSku.push(it.sku);
          }
        });
      });
      yield all(listSku.map((it) => call(getImage, it)));
    }
  } catch (e) {
    console.log(e);
  }
}

function* getImageData({sku}) {
  yield call(getImage, sku);
}

function* getImage(sku) {
  const requestURL = `rest/V1/products/${sku}/media`;

  const res = yield axios.get(requestURL, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.data[0] && res.data[0].file) {
    yield put(actionSetProductMedia(sku, res.data[0].file));
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(GET_LIST_ORDER, getOrderList);
  yield takeEvery(GET_IMAGE_PRODUCT, getImageData);
}
