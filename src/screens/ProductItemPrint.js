import React, {useEffect} from 'react';
import {View, StyleSheet, ViewPropTypes, Image} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, Price, Divider, Card} from '../common';
import {isObject} from '../utils';
import {DIMENS, SPACING} from '../constants';
import {createStructuredSelector} from 'reselect';
import {
  makeSelectDataImage,
  makeSelectLoaderImage,
  makeSelectOrderListData,
} from '../store/app/appSelector';
import {actionGetProductMedia} from '../store/app/appActions';
import {magentoOptions} from '../config/magento';
import LoadingView from '../common/LoadingView/LoadingView';

// TODO: Fetch Media of each product and show image
const ProductItemPrint = ({item: product, currencySymbol = '$'}) => {
  let {name, price, row_total: rowTotal} = product;

  if (isObject(product.parent_item)) {
    name = product.parent_item.name || name;
    if (price === 0) {
      price = product.parent_item.price || price;
      rowTotal = product.parent_item.row_total || rowTotal;
    }
  }

  return (
    <View style={[styles.card]}>
      <View style={styles.detailContainer}>
        <Text bold>{name}</Text>
        {/*<Text>Sku: {product.sku}</Text>*/}
        <Text>
          Quantity:{' '}
          <Text bold style={styles.row}>
            {product.qty_ordered}
          </Text>{' '}
        </Text>
        <View style={styles.row}>
          <Text>SubTotal: </Text>
          <Price
            basePrice={price}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        {product.qty_ordered > 1 && (
          <View style={styles.row}>
            <Text>SubTotal</Text>
            <Price
              basePrice={rowTotal}
              currencySymbol={currencySymbol}
              currencyRate={1}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    // padding: SPACING.small,
    paddingLeft: 15,
  },
  imageStyle: {
    resizeMode: 'cover',
    width: DIMENS.ordersScreen.productWidth,
    height: DIMENS.ordersScreen.productHeight,
    marginRight: SPACING.small,
  },
  detailContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
});

const propTypes = {
  item: PropTypes.shape({
    sku: PropTypes.string,
    price: PropTypes.number,
    row_total: PropTypes.nuymber,
    parent_item: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      row_total: PropTypes.number,
    }),
  }).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style,
};

ProductItemPrint.propTypes = propTypes;

export default connect(null, null)(ProductItemPrint);
