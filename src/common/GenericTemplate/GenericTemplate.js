import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, ViewPropTypes } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import LoadingView from '../LoadingView/LoadingView';
import { ThemeContext } from '../../theme';

const propTypes = {
  // status: PropTypes.oneOf(Object.values(Status)),
  // children: PropTypes.oneOfType([
  //   PropTypes.element,
  //   PropTypes.arrayOf(PropTypes.element),
  // ]).isRequired,
  // scrollable: PropTypes.bool,
  // footer: PropTypes.element,
  // errorMessage: PropTypes.string,
  // style: ViewPropTypes.style,
  // refreshControl: PropTypes.element,
  // onLayout: PropTypes.func,
  // assignRef: PropTypes.func,
};

const defaultProps = {
  // status: Status.SUCCESS,
  // scrollable: false,
  // errorMessage: '',
  // style: {},
  // footer: <></>,
  // refreshControl: undefined,
  // onLayout: undefined,
  // assignRef: undefined,
};

const GenericTemplate = ({
  children,
  footer,
  scrollable,
  status,
  errorMessage,
  style,
  refreshControl,
  onLayout,
  assignRef,
}) => {
  const { theme } = useContext(ThemeContext);
  const ViewGroup = scrollable ? ScrollView : View;
  const props = {};

  if (scrollable) {
    props.contentContainerStyle = style;
    if (refreshControl) {
      props.refreshControl = refreshControl;
    }
  } else {
    props.style = [styles.content, style];
  }

  return (
    <SafeAreaView
      {...(onLayout && { onLayout })}
      style={styles.container(theme)}
    >
      <ViewGroup
        ref={component => assignRef && assignRef(component)}
        {...props}
      >
        {!refreshControl &&
          (status === Status.DEFAULT || status === Status.LOADING) && (
            <LoadingView />
          )}
        {status === Status.ERROR && (
          <MessageView type="error" message={errorMessage} />
        )}
        {status === Status.SUCCESS && children}
      </ViewGroup>
      {footer}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.backgroundColor,
  }),
  content: {
    flex: 1,
  },
  stickyFooter: {},
});

GenericTemplate.propTypes = propTypes;

GenericTemplate.defaultProps = defaultProps;

export default GenericTemplate;
