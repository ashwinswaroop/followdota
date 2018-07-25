import {
  combineReducers
} from 'redux';
import FollowReducer from './FollowReducer';
import NavReducer from './NavReducer';

const AppReducer = combineReducers({
  followed: FollowReducer,
  nav: NavReducer,
});

export default AppReducer;
