import { LoadingButton } from '@mui/lab';
import {
  Box,
  FormControl,
  FormControlLabel,
  // eslint-disable-next-line perfectionist/sort-named-imports
  FormLabel,
  // eslint-disable-next-line perfectionist/sort-named-imports
  Radio,
  RadioGroup,
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
// import { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies, perfectionist/sort-imports
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line perfectionist/sort-imports, no-unused-vars, unused-imports/no-unused-imports
import { userAction } from 'src/actions';

const UserModal = () => {
  const userList = useSelector((state) => state.userList);
  const { userData, isToggle, isModel } = useSelector((state) => state.userDetail);
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

  const formik = useFormik({
    initialValues: {
      id: userData && userData.id ? userData.id : userList.length + 1,
      name: userData && userData.name ? userData.name : '',
      company: userData && userData.company ? userData.company : '',
      role: userData && userData.role ? userData.role : '',
      verified: userData && userData.verified ? userData.verified : '',
      status: userData && userData.status ? userData.status : '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log('value', values);
      console.log('helloo');

      dispatch(userAction.storeUser({ userData: values }));

      dispatch(userAction.resetUserDetail());
    },
  });

  return (
    <Modal
      open={isToggle}
      onClose={() => dispatch(userAction.resetUserDetail())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isModel}
        </Typography>
        <Stack spacing={3}>
          <TextField
            name="name"
            label="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <TextField
            name="company"
            label="company"
            value={formik.values.company}
            onChange={formik.handleChange}
          />

          <TextField
            name="role"
            label="role"
            value={formik.values.role}
            onChange={formik.handleChange}
          />

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Verified</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                name="verified"
                value="yes"
                checked={formik.values.verified === 'yes'}
                control={<Radio />}
                onChange={formik.handleChange}
                label="yes"
              />
              <FormControlLabel
                name="verified"
                value="no"
                checked={formik.values.verified === 'no'}
                control={<Radio />}
                onChange={formik.handleChange}
                label="no"
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              // defaultValue={formik.values.status}
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                name="status"
                value="Active"
                checked={formik.values.status === 'Active'}
                control={<Radio />}
                onChange={formik.handleChange}
                label="Active"
              />
              <FormControlLabel
                name="status"
                value="Banned"
                checked={formik.values.status === 'Banned'}
                control={<Radio />}
                onChange={formik.handleChange}
                label="Banned"
              />
            </RadioGroup>
          </FormControl>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={formik.handleSubmit}
          >
            {isModel}
          </LoadingButton>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={() => dispatch(userAction.resetUserDetail())}
          >
            Cancel
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
};
export default UserModal;
