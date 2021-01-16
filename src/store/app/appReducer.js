import {SET_LIST_ORDER, SET_DATA_IMAGE, SET_DATA_ORDER} from '../../constants';

const INITIAL_STATE = {
  orderList: {},
  dataImage: {},
  dataOrder: {},
  loaderData: true,
  loaderImage: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LIST_ORDER:
      console.log('call data done!');
      state.orderList = action.data;
      return {
        ...state,
        // orderList: action.data,
        loaderData: false,
      };
      break;
    case SET_DATA_IMAGE:
      state.dataImage[action.sku] = action.data;
      return {
        ...state,
        loaderImage: false,
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
