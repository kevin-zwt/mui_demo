import { productConstant } from '../constants/product.constant';

const initialState = [];

const productDetailInitialState = {
  isToggle: false,
  productData: null,
  isDetailToggle:false,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstant.ALL_PRODUCT_CONSTANT:
      return action.payload;
    case productConstant.PRODUCT_STORE_CONSTANT:
      // eslint-disable-next-line no-case-declarations
      const { products } = action.payload;
      // eslint-disable-next-line no-case-declarations
      let updatedProductData = [...state];

      // eslint-disable-next-line no-case-declarations
      const flag = state.filter((data) => data.id === products.id);

      if (flag.length > 0) {
        updatedProductData = updatedProductData.map((item, index) =>
          item.id === products.id ? products : item
        );
      } else {
        updatedProductData = [...updatedProductData, products];
      }

      return updatedProductData;
    // eslint-disable-next-line no-undef

    case productConstant.PRODUCT_DELETE_CONSTANT:
      // eslint-disable-next-line no-case-declarations
      const selected = action.payload;

      // eslint-disable-next-line no-case-declarations
      const updatedProducts = state.filter((user) => !selected.includes(user.id));
      return updatedProducts;
    default:
      return state;
  }
};

export const productDetailReducer = (state = productDetailInitialState, action) => {
  switch (action.type) {
    case productConstant.PRODUCT_TOGGLE_CONSTANT:
      // eslint-disable-next-line no-case-declarations
      const { isToggle, productData ,isDetailToggle} = action.payload;
      return {
        ...state,
        isToggle,
        productData,
        isDetailToggle,
      };
    case productConstant.PRODUCT_DETAIL_INITIAL_CONSTANT:
      return productDetailInitialState;
    default:
      return state;
  }
};
