// eslint-disable-next-line perfectionist/sort-named-imports
import { useCallback, useEffect, useRef, useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { products } from 'src/_mock/products';

// eslint-disable-next-line perfectionist/sort-imports, import/order
import Iconify from 'src/components/iconify';
// eslint-disable-next-line perfectionist/sort-imports, import/order, perfectionist/sort-named-imports
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  // eslint-disable-next-line perfectionist/sort-named-imports
  OutlinedInput,
  // eslint-disable-next-line perfectionist/sort-named-imports
  Toolbar,
  Tooltip,
} from '@mui/material';
// eslint-disable-next-line perfectionist/sort-imports
// import ProductModel from './ProductModel';
// eslint-disable-next-line perfectionist/sort-imports, import/order
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line import/order
import { productAction } from 'src/actions';

// eslint-disable-next-line perfectionist/sort-imports, import/no-unresolved

// eslint-disable-next-line perfectionist/sort-imports, import/order
import { useNavigate } from 'react-router-dom';

import BreadCrumb from 'src/sections/Details/BreadCrumb';

import ProductSort from '../product-sort';
import ProductCard from '../product-card';
import ProductModel from './ProductModel';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [selected, setSelected] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const searchText = useRef('');
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const navigate = useNavigate();

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleDetails = () => {
    const userDetails = productList.filter((data) => data.id === selected[0])[0];
    dispatch(
      productAction.toggleProduct({
        productData: userDetails,
        isToggle: false,
        isDetailToggle: false,
      })
    );
    navigate('/products/detail');
  };
  const handleAdd = () => {
    dispatch(
      productAction.toggleProduct({ productData: [], isToggle: true, isDetailToggle: false })
    );
  };
  const handleEdit = () => {
    const editUser = productList.filter((data) => data.id === selected[0])[0];
    dispatch(
      productAction.toggleProduct({ productData: editUser, isToggle: true, isDetailToggle: false })
    );
  };

  const handleDelete = () => {
    dispatch(productAction.removeProduct(selected));
    setSelected([]);
  };

  useEffect(() => {
    if (!productList.length) {
      dispatch(productAction.setProduct(products));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    console.log(selected);

    let newSelected = [];

    // for add
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);

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
  const debounce = (func) => {
    let timer;
    // eslint-disable-next-line func-names
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleSearch = () => {
    console.log('test');
    const searchVal = searchText?.current?.value;
    const filterData =
      searchVal.length > 0
        ? productList.filter((product) => product.name.toLowerCase().includes(searchVal))
        : [];
    setSearchData(filterData);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedFn = useCallback(debounce(handleSearch), [productList]);
  return (
    <Container>
      <Box display="flex" flexDirection="row" alignItems="center">
        <BreadCrumb />
      </Box>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Toolbar
        sx={{
          height: 96,
          display: 'flex',
          justifyContent: 'space-between',
          p: (theme) => theme.spacing(0, 1, 0, 3),
          ...(selected.length > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        {selected.length > 0 ? (
          <Typography component="div" variant="subtitle1">
            {selected.length} selected
          </Typography>
        ) : (
          <OutlinedInput
            inputRef={searchText}
            name="filterName"
            onChange={optimizedFn}
            placeholder="Search Products..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
        )}

        {selected.length > 0 ? (
          <Box>
            {selected.length === 1 && (
              <>
                <Tooltip title="Edit">
                  <IconButton cursor="pointer" onClick={handleEdit}>
                    <Iconify icon="eva:edit-2-fill" />
                  </IconButton>
                </Tooltip>
                <Button variant="contained" onClick={handleDetails}>
                  Details
                </Button>
              </>
            )}

            <Tooltip title="Delete">
              <IconButton cursor="pointer" onClick={handleDelete}>
                <Iconify icon="eva:trash-2-fill" />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap-reverse"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
          >
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleAdd}
            >
              Add Product
            </Button>
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ProductFilters
                openFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />
              <ProductSort />
            </Stack>
          </Stack>
        )}
      </Toolbar>

      <ProductModel />

      <Grid container spacing={3}>
        {(searchText?.current && searchText?.current.value.length > 0
          ? searchData
          : productList
        ).map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard
              product={product}
              handleClick={(event) => handleClick(event, product.id)}
              selected={selected}
            />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
