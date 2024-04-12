/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
import { userConstant } from '../constants';

const initState = {
  registerData: [],
  userData: [],
  editConfig: { isOpen: false, isModel: '', editUser: null },
  // isOpen: false,
  // isModel: '',
  // editUser: null,
};

const usersInitialState = [];
const userDetailInitialState = {
  userData: null,
  isToggle: false,
  isModel: '',
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userConstant.SET_REGISTER:
      return { ...state, registerData: action.payload };

    case userConstant.SET_USER:
      return {
        ...state,
        userData: [...state.userData, action.payload],
      };
    case userConstant.SET_EDIT:
      // const userIndex = action.payload.index;
      // const updatedUserData = [...state.userData].map((user, index) =>
      //   index === userIndex.id ? action.payload.newState : user
      // );

      // return { ...state, userData: updatedUserData };
      const edituser = action.payload.newState;
      const updatedData = { ...state.userData[action.payload.index.id] };
      const cloneUserData = [...state.userData];

      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in edituser) {
        // eslint-disable-next-line no-unused-expressions
        typeof updatedData[key] === 'object'
          ? (updatedData[key] = { ...updatedData[key], ...edituser[key] })
          : (updatedData[key] = edituser[key]);
      }
      cloneUserData[action.payload.index.id] = updatedData;

      return { ...state, userData: cloneUserData };

    case userConstant.DELETE_USER:
      console.log('delete', state);
      const removeList = state.userData.filter((data, id) => id !== action.payload);
      return { ...state, userData: removeList };

    // case userConstant.SET_OPEN:
    //   return {
    //     ...state,
    //     isOpen: action.payload,
    //   };
    // case userConstant.SET_MODEL:
    //   return {
    //     ...state,
    //     isModel: action.payload,
    //   };
    case userConstant.SET_EDIT_CONFIG:
      return {
        ...state,
        editConfig: {
          ...state.editConfig,
          isOpen: true,
          isModel: 'edit',
          editUser: action.payload,
        },
      };

    default:
      return state;
  }
};

export const usersReducer = (state = usersInitialState, action) => {
  switch (action.type) {
    case userConstant.ALL_USER_CONSTANT:
      return action.payload;
    case userConstant.USER_STORE_CONSTANT:
      const { userData } = action.payload;
      let updatedUserData = [...state];

      // eslint-disable-next-line array-callback-return
      const flag = state.filter((data) => data.id === userData.id);

      if (flag.length > 0) {
        updatedUserData = updatedUserData.map((user, index) =>
          user.id === userData.id ? userData : user
        );
      } else {
        updatedUserData = [...updatedUserData, userData];
      }
      return updatedUserData;







      
    case userConstant.USER_DELETE_CONSTANT:
      const id = action.payload;
      console.log('id', id);
      const UpdatedUser = state.filter((user) => user.id !== id);
      return UpdatedUser;
    default:
      return state;
  }
};
export const userDetailReducer = (state = userDetailInitialState, action) => {
  switch (action.type) {
    case userConstant.USER_TOGGLE_CONSTANT:
      const { userData, isToggle, isModel } = action.payload;
      return {
        ...state,
        userData,
        isToggle,
        isModel,
      };
    case userConstant.USER_DETAIL_INITIAL_CONSTANT:
      return userDetailInitialState;
    default:
      return state;
  }
};
