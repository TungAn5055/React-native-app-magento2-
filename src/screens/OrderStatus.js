import React, {useEffect, useContext, useState, useMemo} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeContext} from '../theme';
import {SPACING} from '../constants';
import {Button, Text} from '../common';

const OrderStatus = ({
  navigation,
  route: {
    params: {message = 'You have successfully confirmed your order!'},
  },
}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.magin}>
        <Text bold>{message}</Text>
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
    marginBottom: SPACING.extraLarge,
  },
  buttonOk: {
    marginTop: SPACING.tiny,
    width: '80%',
    backgroundColor: '#3333FF',
    padding: 13,
    borderRadius: 13,
    alignSelf: 'center',
  },
});
