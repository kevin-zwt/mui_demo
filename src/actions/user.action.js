import { userConstant } from '../constants';

const setRegister = (payload) => ({
  type: userConstant.SET_REGISTER,
  payload,
});

const setUser = (payload) => ({
  type: userConstant.SET_USER,
  payload,
});
const setEdit = (values, id) => ({
  type: userConstant.SET_EDIT,
  // eslint-disable-next-line object-shorthand
  payload: { newState: values, index: id },
});
const deleteUser = (payload) => ({
  type: userConstant.DELETE_USER,
  payload,
});
const setEditConfig = (payload) => ({
  type: userConstant.SET_EDIT_CONFIG,
  payload,
});

// crud
const setUsers = (payload) => ({
  type: userConstant.ALL_USER_CONSTANT,
  payload,
});
const storeUser = (payload) => ({
  type: userConstant.USER_STORE_CONSTANT,
  payload,
});
const toggleUser = (payload) => ({
  type: userConstant.USER_TOGGLE_CONSTANT,
  payload,
});
const removeUser = (payload) => ({
  type: userConstant.USER_DELETE_CONSTANT,
  payload,
});
const resetUserDetail = () => ({
  type: userConstant.USER_DETAIL_INITIAL_CONSTANT,
});
export const userAction = {
  setRegister,
  setUser,
  deleteUser,
  setEditConfig,
  setEdit,
  setUsers,
  storeUser,
  toggleUser,
  removeUser,
  resetUserDetail
};
