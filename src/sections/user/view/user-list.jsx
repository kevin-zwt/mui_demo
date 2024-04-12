import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies, perfectionist/sort-imports, import/order
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// eslint-disable-next-line perfectionist/sort-imports, import/order
import { userAction } from 'src/actions';

// eslint-disable-next-line perfectionist/sort-imports
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import BreadCrumb from 'src/sections/Details/BreadCrumb';

// eslint-disable-next-line perfectionist/sort-imports
import UserModal from './Model';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
// eslint-disable-next-line perfectionist/sort-imports, import/order, perfectionist/sort-named-imports

// eslint-disable-next-line import/order

// eslint-disable-next-line import/order
// import { useRouter } from 'src/routes/hooks';
// import { useFormik } from 'formik';
// import { userAction } from 'src/actions';
// import { Router } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function UserPage() {
  // const { userData, isOpen } = useSelector((state) => state.users);
  const userList = useSelector((state) => state.userList);
  const { isToggle } = useSelector((state) => state.userDetail);
  const [page, setPage] = useState(0);
  // const router = useRouter();
  const [order, setOrder] = useState('asc');
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {

    const selectedIndex = selected.indexOf(name);
   
    let newSelected = [];

    // for add
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);


  //  for removing one element
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
  
      // for removing lastEle
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));

      // for removing any ele in between 
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
    inputData: userList,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleAdd = () => {
    dispatch(userAction.toggleUser({ userData: [], isToggle: true, isModel: 'Add' }));
  };
  const handleEdit = (id) => {
    const editUser = userList.filter((data) => data.id === id)[0];
    dispatch(userAction.toggleUser({ userData: editUser, isToggle: true, isModel: 'Edit' }));
  };

  return (
    <Container>
      <Box display="flex" flexDirection="row" alignItems="center">
        <BreadCrumb />
      </Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => handleAdd()}
        >
          New User
        </Button>
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
                rowCount={userList.length}
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
                    <UserTableRow
                      id={row.id}
                      handleEdit={handleEdit}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      verified={row.verified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, userList.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={userList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {isToggle && <UserModal />}
    </Container>
  );
}
