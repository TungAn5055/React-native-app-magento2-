import React, {useEffect, useContext, useState, useMemo} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeContext} from '../theme';
import {SPACING} from '../constants';
import {CONFIGURABLE_TYPE_SK} from '../constants';
import ProductItem from './ProductItem';
import {Card, Text, Icon, Price, Divider} from '../common';
import {getFormattedDate, isDateValid, stringToDate} from '../utils';
import {priceSignByCode} from '../utils/price';
import axios from 'axios';

const OrderDetails = ({
  route: {
    params: {orderId = -1, placedOn = '', order = {}},
  },
}) => {
  const {theme} = useContext(ThemeContext);
  const [orderDetail, setOrderDetail] = useState(order);
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
          }
        });
    }
  }, [orderId]);

  const currencySymbol =
    priceSignByCode(orderDetail.order_currency_code) || '$';
  // const placedOn = stringToDate(orderDetail.created_at);
  console.log('1231fsddd');
  console.log(placedOn);

  const renderHeader = () => (
    <>
      <Card type="clear" style={styles.headerContainer}>
        <Text>{`Status: ${orderDetail.status}`}</Text>
        <Text>{`PlacedOn: ${
          isDateValid(placedOn)
            ? getFormattedDate(stringToDate())
            : order.created_at
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
    </SafeAreaView>
  );
};

export default connect(null, null)(OrderDetails);

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.large,
  },
  headerContainer: {
    padding: SPACING.large,
    marginBottom: SPACING.large,
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
