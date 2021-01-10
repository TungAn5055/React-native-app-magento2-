import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import { ThemeContext } from '../../theme';
import { SPACING } from '../../constants';

const INFO = 'info';
const SUCCESS = 'success';
const ERROR = 'error';

const propTypes = {
  /**
   * @param {String} message text to be displayed
   */
  message: PropTypes.string.isRequired,
  /**
   * @param {String} type determines styling of the text
   * type value can be
   * 1. 'info'
   * 2. 'success'
   * 3. 'error'
   */
  type: PropTypes.oneOf([INFO, SUCCESS, ERROR]),
};

const defaultProps = {
  type: INFO,
};

const MessageView = ({ message, type }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <Text type="body" style={styles.text(type, theme)}>
        {message}
      </Text>
    </View>
  );
};

const getTextColor = (type, theme) => {
  switch (type) {
    case SUCCESS:
      return theme.successColor;
    case ERROR:
      return theme.errorColor;
    default:
      return theme.bodyTextColor;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: (type, theme) => ({
    textAlign: 'center',
    padding: SPACING.small,
    color: getTextColor(type, theme),
  }),
});

MessageView.propTypes = propTypes;

MessageView.defaultProps = defaultProps;

export default MessageView;
