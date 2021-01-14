import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Text from '../Text/Text';
import Image from '../Image/Image';
import Card from '../Card/Card';
import Price from '../Price/Price';
import { magento } from '../../magento';
import {
  getProductThumbnailFromAttribute,
  getPriceFromChildren,
} from '../../utils/products';
import { ThemeContext } from '../../theme';
import { productType } from '../../utils';
// import { DIMENS, SPACING, CONFIGURABLE_TYPE_SK } from '../../constants';

const propTypes = {
  /**
   * Product to dispaly
   */
  product: productType.isRequired,
  /**
   * Currency symbol to be displayed along side price.
   */
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  columnCount: PropTypes.number,
};

const defaultProps = {
  columnCount: 1,
};

const ProductListItem = ({
  columnCount,
  product,
  currencySymbol,
  currencyRate,
}) => {
  const { theme } = useContext(ThemeContext);
  const [children, setChildren] = useState(null);
  const [price, setPrice] = useState({
    basePrice: product.price,
  });
  const navigation = useNavigation();

  useEffect(() => {
    // componentDidMount
    if (product.type_id === CONFIGURABLE_TYPE_SK) {
      magento.admin
        .getConfigurableChildren(product.sku)
        .then(response => setChildren(response))
        .catch(error => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (
      product.type_id === CONFIGURABLE_TYPE_SK &&
      Array.isArray(children) &&
      children.length > 0
    ) {
      const priceObject = getPriceFromChildren(children);
      if (priceObject.starting === priceObject.ending) {
        setPrice({ basePrice: priceObject.starting });
      } else {
        setPrice({
          startingPrice: priceObject.starting,
          endingPrice: priceObject.ending,
        });
      }
    }
  }, [children]);

  const onItemPress = () =>
    navigation.navigate(ProductDetailScreen, {
      product,
      children,
      sku: product.sku,
      title: product.name,
    });

  return (
    <Card
      type="outline"
      style={styles.container(theme, columnCount)}
      onPress={onItemPress}
    >
      <Image
        source={{
          uri: product
            ? `${magento.getProductMediaUrl()}${getProductThumbnailFromAttribute(
                product,
              )}`
            : '',
        }}
        style={styles.imageStyle}
        resizeMode="contain"
      />
      <View style={styles.detail}>
        <Text ellipsizeMode="tail" numberOfLines={2}>
          {product.name}
        </Text>
        <Price
          {...price}
          currencyRate={currencyRate}
          currencySymbol={currencySymbol}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: (theme, columnCount) => ({
    width:
      columnCount > 1
        ? DIMENS.common.WINDOW_WIDTH / columnCount
        : DIMENS.catalogGridItemWidth,
    height: DIMENS.catalogGridItemHeight,
  }),
  imageStyle: {
    height: DIMENS.catalogGridItemImageHeight,
  },
  detail: {
    padding: SPACING.small,
    flex: 1,
    justifyContent: 'space-between',
  },
});

ProductListItem.propTypes = propTypes;

ProductListItem.defaultProps = defaultProps;

export default ProductListItem;
