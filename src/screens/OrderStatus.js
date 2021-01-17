import React, {useEffect, useContext, useState, useMemo} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CONFIGURABLE_TYPE_SK, SPACING} from '../constants';
import {Button, Card, Divider, Icon, Price, Text} from '../common';
import {getFormattedDate, isDateValid} from '../utils';
import {priceSignByCode} from '../utils/price';
import {ThemeContext} from '../theme';
import ProductItem from './ProductItem';

const OrderStatus = ({
  navigation,
  route: {
    params: {
      message = 'You have successfully confirmed your order!',
      orderDetail,
      placedOns,
    },
  },
}) => {
  const {theme} = useContext(ThemeContext);
  const listItemStyle = useMemo(() => styles.listItem(theme), [theme]);

  const renderHeader = () => (
    <>
      {Object.values(orderDetail).length > 0 ? (
        <Card type="clear" style={styles.headerContainer}>
          <Text>{'Status: Complete'}</Text>
          <Text>{`PlacedOn: ${
            isDateValid(placedOns) ? getFormattedDate(placedOns) : placedOns
          }`}</Text>
          <View style={styles.row}>
            <Text>{'SubTotal: '}</Text>
            <Price
              basePrice={orderDetail.subtotal}
              currencySymbol={
                priceSignByCode(orderDetail.order_currency_code) || '$'
              }
              currencyRate={1}
            />
          </View>
          <View style={styles.row}>
            <Text>{'ShippingAndHandling: '}</Text>
            <Price
              basePrice={orderDetail.shipping_amount}
              currencySymbol={
                priceSignByCode(orderDetail.order_currency_code) || '$'
              }
              currencyRate={1}
            />
          </View>
          <View style={styles.row}>
            <Text>{'Discount: - '}</Text>
            <Price
              basePrice={Math.abs(orderDetail.discount_amount)}
              currencySymbol={
                priceSignByCode(orderDetail.order_currency_code) || '$'
              }
              currencyRate={1}
            />
          </View>
          <View style={styles.row}>
            <Text>{'GrandTotal: '}</Text>
            <Price
              basePrice={orderDetail.total_due}
              currencySymbol={
                priceSignByCode(orderDetail.order_currency_code) || '$'
              }
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
      ) : (
        <></>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {Object.values(orderDetail).length > 0 ? (
        <FlatList
          data={(orderDetail.items || []).filter(
            (entity) => entity.product_type !== CONFIGURABLE_TYPE_SK,
          )}
          renderItem={({item}) => (
            <ProductItem
              item={item}
              currencySymbol={
                priceSignByCode(orderDetail.order_currency_code) || '$'
              }
              containerStyle={listItemStyle}
            />
          )}
          ListHeaderComponent={renderHeader}
          keyExtractor={(_item) => _item.sku}
        />
      ) : (
        <></>
      )}
      <View style={styles.magin}>
        <Text bold style={{color: 'red', textAlign: 'center'}}>
          {message}
        </Text>
      </View>
      <View>
        <Button
          title="Print"
          titleStyle={styles.loginButtonText}
          style={styles.buttonOk}
          // onPress={onPrints}
        />
      </View>
    </SafeAreaView>
  );
};

export default connect(null, null)(OrderStatus);

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.large,
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: SPACING.small,
  },
  magin: {
    marginBottom: SPACING.small,
    marginTop: SPACING.small,
  },
  buttonOk: {
    marginTop: SPACING.tiny,
    width: '80%',
    backgroundColor: '#3333FF',
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
