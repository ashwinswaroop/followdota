import {
  createStore,
  applyMiddleware
} from 'redux';
import {
  persistStore,
  persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import AppReducer from '../reducers/AppReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, AppReducer);

const middleware = createReactNavigationReduxMiddleware("root", state => state.nav);

export const store = createStore(pReducer, applyMiddleware(middleware));

export const persistor = persistStore(store);
