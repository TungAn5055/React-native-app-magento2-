import React, {useEffect, useContext, useState, useMemo} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeContext} from '../theme';
import axios from 'axios';
import {CONFIGURABLE_TYPE_SK, SPACING} from '../constants';
import ProductItem from './ProductItem';
import {Card, Text, Icon, Price, Divider, Button, LoadingView} from '../common';
import {getFormattedDate, isDateValid, stringToDate} from '../utils';
import {priceSignByCode} from '../utils/price';

const OrderDetails = ({
  navigation,
  route: {
    params: {orderId = -1, placedOn = '', order = {}},
  },
}) => {
  const {theme} = useContext(ThemeContext);
  const [orderDetail, setOrderDetail] = useState(order);
  const [orderDetailLoader, setOrderDetailLoader] = useState(true);
  const [loader, setOrderLoader] = useState(false);
  const listItemStyle = useMemo(() => styles.listItem(theme), [theme]);
  useEffect(() => {
    if (orderId) {
      const requestURL = `rest/V1/orders/${orderId}`;
      axios
        .get(requestURL, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setOrderDetail(res.data);
            setOrderDetailLoader(false);
          }
        })
        .catch((err) => {
          setOrderDetailLoader(false);
        });
    }
  }, [orderId]);

  const currencySymbol =
    priceSignByCode(orderDetail.order_currency_code) || '$';
  const placedOns = stringToDate(placedOn);

  const onClickAccept = () => {
    if (orderId) {
      setOrderLoader(true);
      const requestURL = `rest/default/V1/order/${orderId}/invoice`;
      axios
        .post(requestURL, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          if (res.status === 200) {
            navigation.navigate('OrderStatus', {
              message: 'You have successfully confirmed your order!',
            });
            setOrderLoader(false);
          }
        })
        .catch((error) => {
          if (error) {
            Alert.alert('You Cannot Invoice Order!');
          }
          setOrderLoader(false);
        });
    }
  };
  const onClickCancel = () => {
    Alert.alert(
      null,
      'Do you want cancel this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setOrderLoader(true);
            if (orderId) {
              const requestURL = `/rest/default/V1/orders/${orderId}/cancel`;
              axios
                .post(requestURL, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                .then((res) => {
                  if (res.status === 200) {
                    navigation.navigate('OrderStatus', {
                      message: 'You have successfully canceled your order!',
                    });
                  }
                  setOrderLoader(false);
                })
                .catch((error) => {
                  if (error) {
                    Alert.alert('You Cannot Cancel Order!');
                  }
                  setOrderLoader(false);
                });
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
  const renderHeader = () => (
    <>
      {loader ? (
        <LoadingView />
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title="Accept"
            titleStyle={styles.loginButtonText}
            style={styles.buttonOk}
            onPress={onClickAccept}
          />
          <Button
            title="Cancel"
            titleStyle={styles.loginButtonText}
            style={styles.buttonCancel}
            onPress={onClickCancel}
            icon={{type: 'font-awesome', name: 'facebook'}}
          />
        </View>
      )}
      <Card type="clear" style={styles.headerContainer}>
        <Text>{`Status: ${orderDetail.status}`}</Text>
        <Text>{`PlacedOn: ${
          isDateValid(placedOns) ? getFormattedDate(placedOns) : placedOn
        }`}</Text>
        <View style={styles.row}>
          <Text>{'SubTotal: '}</Text>
          <Price
            basePrice={orderDetail.subtotal}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        <View style={styles.row}>
          <Text>{'ShippingAndHandling: '}</Text>
          <Price
            basePrice={orderDetail.shipping_amount}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        <View style={styles.row}>
          <Text>{'Discount: - '}</Text>
          <Price
            basePrice={Math.abs(orderDetail.discount_amount)}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        <View style={styles.row}>
          <Text>{'GrandTotal: '}</Text>
          <Price
            basePrice={orderDetail.total_due}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        <Divider style={styles.divider} />
        <Text style={styles.label} type="label">
          UpdatesSentOn
        </Text>
        <View style={styles.row}>
          <Icon
            name="phone"
            type="antdesign"
            size={14}
            color={theme.successColor}
            style={styles.iconStyle}
          />
          <Text>
            {orderDetail.billing_address &&
            orderDetail.billing_address.telephone
              ? orderDetail.billing_address.telephone
              : ''}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon
            name="email"
            type="fontisto"
            size={14}
            color={theme.errorColor}
            style={styles.iconStyle}
          />
          <Text>
            {orderDetail.billing_address && orderDetail.billing_address.email
              ? orderDetail.billing_address.email
              : ''}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <Text style={styles.label} type="label">
          BillingAndShippingAddress
        </Text>
        <Text bold>
          {' '}
          {orderDetail.billing_address &&
          orderDetail.billing_address.firstname &&
          orderDetail.billing_address.lastname
            ? `${orderDetail.billing_address.firstname} ${
                orderDetail.billing_address.lastname || ''
              }`
            : ''}
        </Text>
        <Text>
          {orderDetail.billing_address && orderDetail.billing_address.street
            ? orderDetail.billing_address.street.reduce(
                (total, part) => `${total}${part}, `,
                '',
              )
            : ''}
          {orderDetail.billing_address && orderDetail.billing_address.city
            ? orderDetail.billing_address.region
            : ''}
          {orderDetail.billing_address && orderDetail.billing_address.postcode
            ? `- ${orderDetail.billing_address.postcode}`
            : ''}
        </Text>
      </Card>
      <Text style={styles.listLabel} bold>
        itemsOrdered
      </Text>
    </>
  );
  return (
    <SafeAreaView style={styles.container}>
      {orderDetailLoader ? (
        <LoadingView />
      ) : (
        <FlatList
          data={(orderDetail.items || []).filter(
            (entity) => entity.product_type !== CONFIGURABLE_TYPE_SK,
          )}
          renderItem={({item}) => (
            <ProductItem
              item={item}
              currencySymbol={currencySymbol}
              containerStyle={listItemStyle}
            />
          )}
          ListHeaderComponent={renderHeader}
          keyExtractor={(_item) => _item.sku}
        />
      )}
    </SafeAreaView>
  );
};

export default connect(null, null)(OrderDetails);

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.large,
  },
  addToCart: {
    borderRadius: 5,
  },
  loginButtonText: {
    textTransform: 'uppercase',
  },
  buttonOk: {
    marginTop: SPACING.tiny,
    width: '80%',
    backgroundColor: '#00CC33',
    padding: 13,
    borderRadius: 13,
    alignSelf: 'center',

    // elevation: 9,
    // backgroundColor: '#009688',
    // borderRadius: 10,
    // paddingVertical: 10,
    // paddingHorizontal: 12,
    // padding: 15,

    // fontSize: 18,
    // color: '#fff',
    // fontWeight: 'bold',
    // alignSelf: 'center',
    // textTransform: 'uppercase',
  },
  buttonCancel: {
    marginTop: SPACING.tiny,
    width: '80%',
    backgroundColor: '#CC3333',
    padding: 13,
    borderRadius: 13,
    alignSelf: 'center',
  },
  headerContainer: {
    padding: SPACING.large,
    marginBottom: SPACING.large,
  },
  buttonContainer: {
    padding: SPACING.small,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginVertical: SPACING.large,
  },
  label: {
    marginBottom: SPACING.tiny,
  },
  iconStyle: {
    marginEnd: SPACING.small,
  },
  listLabel: {
    paddingHorizontal: SPACING.large,
    marginBottom: SPACING.small,
  },
  listItem: (theme) => ({
    backgroundColor: theme.surfaceColor,
    paddingHorizontal: SPACING.large,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.borderColor,
  }),
});
