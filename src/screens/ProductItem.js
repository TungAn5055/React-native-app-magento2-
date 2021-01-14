import React, {useEffect} from 'react';
import {View, StyleSheet, ViewPropTypes, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Price from '../common/Price/Price';
import {isObject} from '../utils';
// import {getProductMedia} from '../../store/actions';

// TODO: Fetch Media of each product and show image
const ProductItem = ({
  item: product,
  // media,
  currencySymbol = '$',
  // containerStyle,
  // getProductMedia: _getProductMedia,
}) => {
  let {name, price, row_total: rowTotal} = product;

  // useEffect(() => {
  //   if (!media) {
  //     _getProductMedia(product.sku);
  //   }
  // }, []);

  if (isObject(product.parent_item)) {
    name = product.parent_item.name || name;
    if (price === 0) {
      price = product.parent_item.price || price;
      rowTotal = product.parent_item.row_total || rowTotal;
    }
  }

  return (
    <View>
      {/*<Image*/}
      {/*  style={styles.imageStyle}*/}
      {/*  source={{*/}
      {/*    uri:*/}
      {/*      Array.isArray(media) && media.length > 0*/}
      {/*        ? `${magento.getProductMediaUrl()}${media[0].file}`*/}
      {/*        : '',*/}
      {/*  }}*/}
      {/*/>*/}
      <Text>{name}</Text>
      <View style={styles.detailContainer}>
        <Text>{name}</Text>
        <Text>sku: {product.sku}</Text>
        <Text>quantity: {product.qty_ordered}</Text>
        <View style={styles.row}>
          <Text>{price}</Text>
          {/*<Price*/}
          {/*  basePrice={price}*/}
          {/*  currencySymbol={currencySymbol}*/}
          {/*  currencyRate={1}*/}
          {/*/>*/}
        </View>
        {product.qty_ordered > 1 && (
          <View style={styles.row}>
            <Text>subTotal</Text>
            {/*<Price*/}
            {/*  basePrice={rowTotal}*/}
            {/*  currencySymbol={currencySymbol}*/}
            {/*  currencyRate={1}*/}
            {/*/>*/}
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
  },
  imageStyle: {
    resizeMode: 'cover',
    // width: DIMENS.ordersScreen.productWidth,
    // height: DIMENS.ordersScreen.productHeight,
    // marginRight: SPACING.small,
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
  // media: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       file: PropTypes.string,
  //       id: PropTypes.number,
  //       label: PropTypes.string,
  //       media_type: PropTypes.string,
  //       types: PropTypes.arrayOf(PropTypes.string),
  //     }),
  // ).isRequired,
  // getProductMedia: PropTypes.func.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style,
};

const defaultProps = {
  // containerStyle: {},
};

ProductItem.propTypes = propTypes;

ProductItem.defaultProps = defaultProps;

// const mapStateToProps = ({product}, {item}) => {
//   const {
//     cachedProductMedia: {[item.sku]: media},
//   } = product;
//   return {
//     media,
//   };
// };

export default connect(null, null)(ProductItem);
