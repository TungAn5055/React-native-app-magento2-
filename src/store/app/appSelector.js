/* Selectors of Order detail */
import {createSelector} from 'reselect';
import {INITIAL_STATE} from './appReducer';
const selectOrderList = (state) => state.magento || INITIAL_STATE;
const makeSelectOrderListData = () =>
  createSelector(
    selectOrderList,
    (selectOrderList) => selectOrderList.orderList,
  );
const makeSelectDataImage = () =>
  createSelector(
    selectOrderList,
    (selectOrderList) => selectOrderList.dataImage,
  );
export {makeSelectOrderListData, makeSelectDataImage};
