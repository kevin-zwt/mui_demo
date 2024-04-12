// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';

import { userReducer, usersReducer, userDetailReducer } from './user.reducer';
// eslint-disable-next-line perfectionist/sort-imports, no-unused-vars, import/named, unused-imports/no-unused-imports
import { productReducer, productDetailReducer } from './product.reducer';


const allreducers = combineReducers({
  users: userReducer,
  userList: usersReducer,
  userDetail: userDetailReducer,
  productList: productReducer,
  productDetail: productDetailReducer,
});

export default allreducers;
