import {GET_LIST_ORDER, SET_LIST_ORDER} from '../../constants';

export const initializeApp = () => ({});
export const actionGetListOrder = (storeId) => ({
  type: GET_LIST_ORDER,
  storeId,
});
export const actionSetListOrder = (data) => ({
  type: SET_LIST_ORDER,
  data,
});
