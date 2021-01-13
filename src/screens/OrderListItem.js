import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
// import ProductItem from './ProductItem';

const propTypes = {
  item: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {};

const OrderListItem = ({item: order, navigation}) => {
  const onPress = () => {
    navigation.navigate('ProductDetail', {
      order,
    });
  };

  return (
    <React.Fragment style={styles.container} onPress={onPress}>
      <View style={styles.orderDetailsContainer}>
        <View style={styles.orderNumberContainer}>
          <Text type="subheading">order numer</Text>
          <Text type="subheading" bold>
            icrement id
          </Text>
        </View>
        <Text>date create fomat</Text>
        <Text>status</Text>
      </View>
      {/*{order.items*/}
      {/*  .filter(item => item.product_type !== CONFIGURABLE_TYPE_SK)*/}
      {/*  .map(item => (*/}
      {/*    <View key={item.sku}>*/}
      {/*      <Divider />*/}
      {/*      <ProductItem item={item} currencySymbol={currencySymbol} />*/}
      {/*    </View>*/}
      {/*  ))}*/}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: space.large,
  },
  orderDetailsContainer: {
    padding: space.small,
  },
  orderNumberContainer: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
});

const baseSpacing = 10;

const space = {
  tiny: baseSpacing * 0.4,
  small: baseSpacing * 0.8,
  medium: baseSpacing * 1.2,
  large: baseSpacing * 1.6,
  extraLarge: baseSpacing * 2.4,
};

OrderListItem.propTypes = propTypes;

OrderListItem.defaultProps = defaultProps;

export default OrderListItem;
