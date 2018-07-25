import React from 'react';
import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import {createStore, combineReducers} from 'redux';
import {createReduxBoundAddListener, createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {connect, Provider} from 'react-redux';
import Home from './Home';
import Search from './Search';

export const AppNavigator = StackNavigator({
  HomeScreen: {
    screen: Home,
    navigationOptions: {
      headerLeft: null,
      header: null
    }
  },
  SearchScreen: {
    screen: Search,
    navigationOptions: {
      headerLeft: null,
      header: null
    }
  }
}, {
  initialRouteName: 'HomeScreen',
  mode: 'modal'
});

function AppWithNavigationState(props) {
  const addListener = createReduxBoundAddListener('root')
  const {dispatch, nav} = props
  const navigation = addNavigationHelpers({dispatch, state: nav, addListener})
  return <AppNavigator navigation={navigation}/>
}

const mapStateToProps = state => ({nav: state.nav});

export default connect(mapStateToProps)(AppWithNavigationState);
