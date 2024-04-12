import { LoadingButton } from '@mui/lab';
import {
  Box,
  // eslint-disable-next-line perfectionist/sort-named-imports
  Stack,
  TextField,
  Typography,
} from '@mui/material';
// eslint-disable-next-line perfectionist/sort-imports
import Modal from '@mui/material/Modal';
// eslint-disable-next-line perfectionist/sort-imports
import { useFormik } from 'formik';
// eslint-disable-next-line perfectionist/sort-imports
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line perfectionist/sort-imports
// import { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies, perfectionist/sort-imports

// eslint-disable-next-line perfectionist/sort-imports, no-unused-vars, unused-imports/no-unused-imports
import { productAction } from 'src/actions';



const UserModal = () => {
  const { isToggle, productData } = useSelector((state) => state.productDetail);
  const productList = useSelector((state) => state.productList);
  const imageData = useRef('');
  const dispatch = useDispatch();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const convertToBase64 = (event) => {
    console.log('good', event.currentTarget.files[0]);
    const file = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      imageData.current = reader.result;
    };
  };

  const formik = useFormik({
    initialValues: {
      id: productData && productData.id ? productData.id : productList.length + 1,
      cover: imageData.current,
      name: productData && productData.name ? productData.name : '',
      discription: productData && productData.discription ? productData.discription : '',
      price: productData && productData.price ? productData.price : '',
      priceSale: productData && productData.priceSale ? productData.priceSale : '',
      colors: [
        '#00AB55',
        '#000000',
        '#FFFFFF',
        '#FFC0CB',
        '#FF4842',
        '#1890FF',
        '#94D82D',
        '#FFC107',
      ],
      status: productData && productData.status ? productData.status : '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log('value', values);
      console.log('helloo');
      dispatch(productAction.storeProduct({ products: values }));
      dispatch(productAction.resetProductDetail());
    },
  });

  return (
    <Modal
      open={isToggle}
      onClose={() => dispatch(productAction.resetProductDetail())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          add
        </Typography>
        <Stack spacing={3}>
          <input name="cover" type="file" onChange={convertToBase64} accept="image/*" />
          <TextField
            name="name"
            label="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <TextField
            name="discription"
            label="discription"
            value={formik.values.discription}
            onChange={formik.handleChange}
          />
          <TextField
            name="price"
            label="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          <TextField
            name="priceSale"
            label="priceSale"
            value={formik.values.priceSale}
            onChange={formik.handleChange}
          />
          <TextField
            name="colors"
            label="colors"
            value={formik.values.colors}
            onChange={formik.handleChange}
          />
          <TextField
            name="status"
            label="status"
            value={formik.values.status}
            onChange={formik.handleChange}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={formik.handleSubmit}
          >
            add
          </LoadingButton>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={() => dispatch(productAction.resetProductDetail())}
          >
            Cancel
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
};
export default UserModal;
