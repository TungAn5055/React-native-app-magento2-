import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {createStructuredSelector} from 'reselect';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {actionGetListOrder} from '../store/app/appActions';
import {makeSelectOrderListData} from '../store/app/appSelector';
import OrderListItem from './OrderListItem';

const Stack = createStackNavigator();

const OrdersListScreen = ({orderListData, navigation}) => {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={orderListData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text> Order Lists is null </Text>}
        // contentContainerStyle={[
        //   styles.flatListConatiner,
        //   orders.length === 0 && {flex: 1},
        // ]}
      />
    </ScrollView>
  );
};

const renderItem = ({ item }) => (
  <OrderListItem item={item} navigation={navigation} />
);

OrdersListScreen.prototype = {
  orderListData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  orderListData: makeSelectOrderListData(),
});

// export function mapDispatchToProps(dispatch) {
//     return {
//         getListOrder: (storeId) => {
//             dispatch(actionGetListOrder(storeId));
//         },
//     };
// }

export default connect(mapStateToProps, null)(OrdersListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
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
