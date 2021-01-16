import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStructuredSelector} from 'reselect';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {actionGetListOrder} from '../store/app/appActions';
import {
  makeSelectLoaderData,
  makeSelectOrderListData,
} from '../store/app/appSelector';
import OrderListItem from './OrderListItem';
import {ThemeContext} from '../theme';
import {SPACING, STORE_ID} from '../constants';
import LoadingView from '../common/LoadingView/LoadingView';

const OrderList = ({getListOrder, orderListData, loaderData, navigation}) => {
  const {theme} = useContext(ThemeContext);
  // useEffect(() => {
  //   if(Object.values(orderListData).length === 0) {
  //     getListOrder(STORE_ID)
  //   }
  // }, []);

  const renderItem = ({item, index}) => {
    return (
      <OrderListItem item={item} index={index + 1} navigation={navigation} />
    );
  };
  return (
    <SafeAreaView style={styles.container(theme)}>
      {loaderData ? (
        <LoadingView />
      ) : (
        <View style={styles.container}>
          <FlatList
            LisHeaderComponent={
              <>
                <Text>List order:</Text>
              </>
            }
            data={orderListData.items}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text> List Order is empty!</Text>}
            contentContainerStyle={[styles.flatListConatiner]}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

OrderList.prototype = {
  getListOrder: PropTypes.func,
  orderListData: PropTypes.object,
  loaderData: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  orderListData: makeSelectOrderListData(),
  loaderData: makeSelectLoaderData(),
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
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.backgroundColor,
  }),
  flatListConatiner: {
    paddingHorizontal: SPACING.small,
    paddingTop: SPACING.small,
  },
  content: {
    flex: 1,
  },
  stickyFooter: {},
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
