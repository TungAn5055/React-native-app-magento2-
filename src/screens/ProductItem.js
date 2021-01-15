import React, {useEffect} from 'react';
import {View, StyleSheet, ViewPropTypes, Image} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, Price} from '../common';
import {isObject} from '../utils';
import {DIMENS, SPACING} from '../constants';
import {createStructuredSelector} from 'reselect';
import {
  makeSelectDataImage,
  makeSelectOrderListData,
} from '../store/app/appSelector';
import {actionGetProductMedia} from '../store/app/appActions';
import {magentoOptions} from '../config/magento';

// TODO: Fetch Media of each product and show image
const ProductItem = ({
  item: product,
  media,
  currencySymbol = '$',
  // containerStyle,
  getProductMedia,
}) => {
  let {name, price, row_total: rowTotal} = product;
  useEffect(() => {
    if (!media[product.sku]) {
      getProductMedia(product.sku);
    }
  }, []);

  // useEffect(() => {
  //   console.log(
  //     `${magentoOptions.url}${magentoOptions.media_base}${media[product.sku]}`,
  //   );
  // }, [media]);

  if (isObject(product.parent_item)) {
    name = product.parent_item.name || name;
    if (price === 0) {
      price = product.parent_item.price || price;
      rowTotal = product.parent_item.row_total || rowTotal;
    }
  }

  return (
    <View style={[styles.card]}>
      <Image
        style={styles.imageStyle}
        source={{
          uri:
            media && Object.values(media).length > 0 && media[product.sku]
              ? `${magentoOptions.url}${magentoOptions.media_base}${
                  media[product.sku]
                }`
              : 'https://vietship.de/media/logo.png',
        }}
      />
      <View style={styles.detailContainer}>
        <Text bold>{name}</Text>
        <Text>sku: {product.sku}</Text>
        <Text>quantity: {product.qty_ordered}</Text>
        <View style={styles.row}>
          <Price
            basePrice={price}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        {product.qty_ordered > 1 && (
          <View style={styles.row}>
            <Text>subTotal</Text>
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
    padding: SPACING.small,
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
      row_total: PropTypes.nuymber,
    }),
  }).isRequired,
  media: PropTypes.any,
  getProductMedia: PropTypes.func,
  currencySymbol: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style,
};

ProductItem.propTypes = propTypes;

// ProductItem.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
  media: makeSelectDataImage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getProductMedia: (sku) => {
      dispatch(actionGetProductMedia(sku));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
