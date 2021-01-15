import {
  GET_LIST_ORDER,
  SET_LIST_ORDER,
  GET_IMAGE_PRODUCT,
  SET_DATA_IMAGE,
  GET_DATA_ORDER,
} from '../../constants';

export const initializeApp = () => ({});
export const actionGetListOrder = (storeId) => ({
  type: GET_LIST_ORDER,
  storeId,
});
export const actionSetListOrder = (data) => ({
  type: SET_LIST_ORDER,
  data,
});
export const actionGetProductMedia = (sku) => ({
  type: GET_IMAGE_PRODUCT,
  sku,
});
export const actionSetProductMedia = (sku, data) => ({
  type: SET_DATA_IMAGE,
  sku,
  data,
});

export const actionGetDataOrder = (orderId) => ({
  type: GET_DATA_ORDER,
  orderId,
});
