import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
  ViewGroup,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {createStructuredSelector} from 'reselect';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {actionGetListOrder} from '../store/app/appActions';
import {makeSelectOrderListData} from '../store/app/appSelector';
import {getFormattedDate, isDateValid, stringToDate} from '../utils';

import {priceSignByCode} from '../utils/price';
import ProductItem from './ProductItem';
import {Card, Divider, Price, Text} from '../common';
import {SPACING} from '../constants';

const OrderList = ({item, index, navigation}) => {
  const theme = useTheme();
  const placedOn = stringToDate(item.created_at);
  const currencySymbol = priceSignByCode(item.order_currency_code);

  const onPress = () => {
    console.log('click');
    navigation.navigate('Home', {title: 'OrderList'});
  };

  return (
    <Card style={styles.container} onPress={onPress}>
      <View style={styles.orderDetailsContainer}>
        <View style={styles.orderNumberContainer}>
          <Text type="subheading" bold>
            {index}
            {'. '}
          </Text>
          <Text type="subheading">OrderNumber:</Text>
          <Text type="subheading" bold>
            {'  '}
            {item.increment_id}
          </Text>
        </View>
      </View>
      <Text>
        Date:{' '}
        {isDateValid(placedOn) ? getFormattedDate(placedOn) : item.created_at}
      </Text>
      <Text>Status: {item.status}</Text>
      <View style={styles.orderNumberContainer}>
        <Text type="subheading">Grand Total:</Text>
        <Text type="subheading" bold>
          {'  '}
          <Price
            basePrice={item.base_grand_total}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </Text>
      </View>
      {item.items
        .filter((it) => it.product_type !== 'configurable')
        .map((it) => (
          <View key={it.sku}>
            <Divider />
            <ProductItem item={it} currencySymbol={currencySymbol} />
          </View>
        ))}
    </Card>
  );
};

OrderList.prototype = {
  getListOrder: PropTypes.func,
  orderListData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  orderListData: makeSelectOrderListData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getListOrder: (storeId) => {
      dispatch(actionGetListOrder(storeId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.large,
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  orderNumberContainer: {
    flexDirection: 'row',
  },
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#de4f35',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
