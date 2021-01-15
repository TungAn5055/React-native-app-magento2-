import {SET_LIST_ORDER, SET_DATA_IMAGE, SET_DATA_ORDER} from '../../constants';

const INITIAL_STATE = {
  orderList: {},
  dataImage: {},
  dataOrder: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LIST_ORDER:
      console.log('call data done!');
      return {
        ...state,
        orderList: action.data,
      };
      break;
    case SET_DATA_IMAGE:
      state.dataImage[action.sku] = action.data;
      return {
        ...state,
      };
      break;
    case SET_DATA_ORDER:
      state.dataImage[action.sku] = action.data;
      return {
        ...state,
      };
      break;
    default:
      return state;
  }
};
