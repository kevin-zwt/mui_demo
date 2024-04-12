import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// eslint-disable-next-line perfectionist/sort-imports
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
// eslint-disable-next-line import/no-extraneous-dependencies, perfectionist/sort-imports, import/order
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line perfectionist/sort-imports, import/order, perfectionist/sort-named-imports
import {
  Box,
  FormControl,
  FormControlLabel,
  // eslint-disable-next-line perfectionist/sort-named-imports
  FormLabel,
  // eslint-disable-next-line perfectionist/sort-named-imports
  Modal,
  Radio,
  RadioGroup,
  // eslint-disable-next-line perfectionist/sort-named-imports
  TextField,
} from '@mui/material';
// eslint-disable-next-line perfectionist/sort-imports, import/order
import { LoadingButton } from '@mui/lab';
// eslint-disable-next-line perfectionist/sort-imports, import/order
import { useFormik } from 'formik';
// eslint-disable-next-line perfectionist/sort-imports, import/order
import { userAction } from 'src/actions';
// eslint-disable-next-line import/order

// eslint-disable-next-line import/order
// import { useRouter } from 'src/routes/hooks';
// import { useFormik } from 'formik';
// import { userAction } from 'src/actions';
// import { Router } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function UserPage() {
  const { userData } = useSelector((state) => state.users);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  // const router = useRouter();
  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: userData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

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

  // const validationSchem = yup.object({
  //   email: yup
  //     .string('Enter your email')
  //     .email('Enter a valid email')
  //     .required('Email is required'),
  //   password: yup
  //     .string('Enter your password')
  //     .min(8, 'Password should be of minimum 8 characters length')
  //     .required('Password is required'),
  // });

  const formik = useFormik({
    initialValues: {
      name: '',
      company: '',
      role: '',
      verified: '',
      status: '',
    },

    onSubmit: (values) => {
      console.log('value', values);
      console.log('helloo');
      dispatch(userAction.setUser(values));
      handleClose();
    },
  });

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          New User
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Generate User
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
                    control={<Radio />}
                    onChange={formik.handleChange}
                    label="yes"
                  />
                  <FormControlLabel
                    name="verified"
                    value="no"
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
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    name="status"
                    value="Active"
                    control={<Radio />}
                    onChange={formik.handleChange}
                    label="Active"
                  />
                  <FormControlLabel
                    name="status"
                    value="Banned"
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
                Add User
              </LoadingButton>
            </Stack>
          </Box>
        </Modal>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={userData.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Company' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <>
                      {console.log(index)}
                      <UserTableRow
                        id={index}
                        handleOpen={handleOpen}
                        name={row.name}
                        role={row.role}
                        status={row.status}
                        company={row.company}
                        // avatarUrl={row.avatarUrl}
                        isVerified={row.isVerified}
                        selected={selected.indexOf(row.name) !== -1}
                        handleClick={(event) => handleClick(event, row.name)}
                      />
                    </>
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, userData.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={userData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
