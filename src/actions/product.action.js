import { productConstant } from '../constants';

const storeProduct = (payload) => ({
  type: productConstant.PRODUCT_STORE_CONSTANT,
  payload,
});
const setProduct = (payload) => ({
  type: productConstant.ALL_PRODUCT_CONSTANT,
  payload,
});
const toggleProduct = (payload) => ({
  type: productConstant.PRODUCT_TOGGLE_CONSTANT,
  payload,
});
const removeProduct = (payload) => ({
  type: productConstant.PRODUCT_DELETE_CONSTANT,
  payload,
});
const resetProductDetail = () => ({
  type: productConstant.PRODUCT_DETAIL_INITIAL_CONSTANT,
});

export const productAction = {
  storeProduct,
  toggleProduct,
  setProduct,
  resetProductDetail,
  removeProduct,
};
