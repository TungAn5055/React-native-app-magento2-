import {SET_LIST_ORDER} from '../../constants';

const INITIAL_STATE = {
  orderList: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LIST_ORDER:
      return {
        ...state,
        orderList: action.data,
      };
    default:
      return state;
  }
};
