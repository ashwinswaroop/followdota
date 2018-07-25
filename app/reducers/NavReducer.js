import {
  combineReducers
} from 'redux';
import {
  NavigationActions
} from 'react-navigation';
import {
  AppNavigator
} from '../components/Navigator';

const router = AppNavigator.router;
const mainNavAction = router.getActionForPathAndParams('HomeScreen');
const initialNavState = router.getStateForAction(mainNavAction);

const NavReducer = (state = initialNavState, action) => {
  return router.getStateForAction(action, state);
};

export default NavReducer;
