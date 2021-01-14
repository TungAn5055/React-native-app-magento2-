import React, {useEffect} from 'react';
import {View, StyleSheet, ViewPropTypes, Image} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, Price} from '../common';
import {isObject} from '../utils';
import {DIMENS, SPACING} from '../constants';
// import {getProductMedia} from '../../store/actions';

// TODO: Fetch Media of each product and show image
const ProductItem = ({
  item: product,
  media,
  currencySymbol = '$',
  // containerStyle,
  // getProductMedia: _getProductMedia,
}) => {
  let {name, price, row_total: rowTotal} = product;
  console.log('price-----');
  console.log(price);
  console.log(product.qty_ordered);
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
    <View style={[styles.card]}>
      <Image
        style={styles.imageStyle}
        source={{
          uri:
            Array.isArray(media) && media.length > 0
              ? // ? `${magento.getProductMediaUrl()}${media[0].file}`
                ''
              : 'https://1.bp.blogspot.com/-n_bFzL9lPUU/Xp23H9Sk8yI/AAAAAAAAhyA/JYfvZhwguxc8vT_YS3w14Xi3YWf3hxqIQCLcBGAsYHQ/s1600/Hinh-Anh-Dep-Tren-Mang%2B%25282%2529.jpg',
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
