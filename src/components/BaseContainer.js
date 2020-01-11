/**
 * @flow
 */
import React, {Component, useEffect} from 'react';
import {View, StyleSheet, StatusBar, Platform} from 'react-native';
import NavBar, {Props as NavBarProps} from './NavBar';
import {theme} from '../config/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useApi} from '../hooks';
import LoadingView from './LoadingView';
import ErrorView from './ErrorView';
import {RouteHelper} from 'react-navigation-easy-helper';

type Props = {
  fitIPhoneX?: boolean,
  useApiStatus?: boolean,
  navBar?: null | Component,
  contentContainerStyle?: any,
  useScrollView?: boolean,
} & NavBarProps;

function BaseContainer(props: Props) {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
    StatusBar.setBarStyle('dark-content');
  }, []);
  const {style, ...otherProps} = props;
  return (
    <View style={[styles.container, style]}>
      <NavView {...otherProps} />
      <Content {...otherProps} />
    </View>
  );
}

function Content(props) {
  const {isApiReady, apiConnectedErrorMessage} = useApi();
  const {
    children,
    useScrollView,
    contentContainerStyle,
    useApiStatus,
    fitIPhoneX,
  } = props;
  if (useApiStatus) {
    if (apiConnectedErrorMessage) {
      return (
        <ErrorView
          errorText={`连接失败:${apiConnectedErrorMessage}`}
          btnTitle={'切换节点'}
          onPress={() => {
            RouteHelper.navigate('NodeSet');
          }}
        />
      );
    }
    if (!isApiReady) {
      return <LoadingView title={'连接中'} />;
    }
  }
  const Contain = useScrollView ? KeyboardAwareScrollView : View;
  let containProps = {};
  if (useScrollView) {
    containProps.style = {flex: 1};
    containProps.contentContainerStyle = {
      paddingBottom: px2dp(60) + theme.bottomHeight,
      ...contentContainerStyle,
    };
  } else {
    containProps.style = [
      {flex: 1, paddingBottom: fitIPhoneX ? theme.bottomHeight : 0},
      contentContainerStyle,
    ];
  }
  return <Contain {...containProps}>{children}</Contain>;
}

function NavView(props) {
  const {navBar, ...navProps} = props;
  let navView = null;
  if (typeof navBar === 'undefined') {
    navView = <NavBar {...navProps} />;
  } else {
    navView = navBar;
  }
  return navView;
}

export default BaseContainer;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: theme.backgroundColor},
});
