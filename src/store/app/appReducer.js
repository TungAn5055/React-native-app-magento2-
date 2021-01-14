import {SET_LIST_ORDER, SET_DATA_IMAGE} from '../../constants';

const INITIAL_STATE = {
  orderList: {},
  dataImage: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LIST_ORDER:
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
    default:
      return state;
  }
};
