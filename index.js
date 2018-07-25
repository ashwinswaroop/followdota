import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import AppWithNavigationState from './app/components/Navigator';
import { persistor, store } from './app/store/Store'
import { PersistGate } from 'redux-persist/lib/integration/react';


class FollowDota extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppWithNavigationState/>
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('followdota', () => FollowDota);

console.disableYellowBox = true;

export default FollowDota;
