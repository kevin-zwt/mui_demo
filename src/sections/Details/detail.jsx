/* eslint-disable react/button-has-type */
import { useRef } from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux';

// eslint-disable-next-line perfectionist/sort-imports
import Divider from '@mui/material/Divider';
import {
  Box,
  Chip,
  Grid,
  Select,
  Button,
  MenuItem,
  TextField,
  InputLabel,
  Typography,
  // eslint-disable-next-line perfectionist/sort-named-imports
  IconButton,
  FormControl,
  InputAdornment,
} from '@mui/material';

import Iconify from 'src/components/iconify';

import Space from './Space';
import BreadCrumb from './BreadCrumb';

const Detail = () => {
  const { productData } = useSelector((state) => state.productDetail);
  const Quantity = useRef();

  const handleAdd = () => {
    const newQ = Quantity.current.value ? Quantity.current.value : 0;
    // eslint-disable-next-line no-multi-assign
    Quantity.current.value = Number(newQ) + 1 > 10 ? 10 : Number(newQ) + 1;
  };
  const handleMinus = () => {
    const newQ = Quantity.current.value ? Quantity.current.value : 0;
    // eslint-disable-next-line no-multi-assign
    Quantity.current.value = Number(newQ) - 1 > 0 ? Number(newQ) - 1 : 0;
  };

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <BreadCrumb />
      </Box>

      <Grid container display="flex" flexDirection="row" gap={16} m="auto">
        <Grid>
          <img src={productData?.cover} height="479px" style={{ borderRadius: '20px' }} alt="hi" />
        </Grid>

        <Grid flexDirection="column" display="flex" p={3}>
          {productData.status?( <Grid>
            <Chip borderRadius="5" label={productData?.status} />
          </Grid>):""}
         
          <Grid>
            <h1> {productData?.name}</h1>
          </Grid>
          <Grid>
            <b>Price: ${productData?.price}</b>
          </Grid>
          <br />
          <Grid>
            <b>Description: </b>
            {productData?.discription}
          </Grid>
          <br />
          <Divider />
          <Grid
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">Size</Typography>
            <FormControl size="small" sx={{ m: 1, minWidth: 120 }} error>
              <InputLabel id="demo-simple-select-error-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <br />
          <Grid
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">Quantity</Typography>
            <TextField
              size="small"
              style={{ width: '130px' }}
              type="number"
              inputRef={Quantity}
              InputProps={{
                inputProps: { min: 0, max: 10 },
                defaultValue: 0,
                onChange: (e) => {
                  console.log(typeof Number(e.target.value) > 10);
                  if (Number(e.target.value) > 10) {
                    Quantity.current.value = 10;
                    return false;
                  }
                  return true;
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={() => handleAdd()}>
                      <Iconify icon="eva:plus-fill" />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleMinus()}>
                      <Iconify icon="eva:minus-fill" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <br />
          <Divider />
          <br />
          <Grid display="flex" flexDirection="row" gap={15}>
            <Button variant="contained" color="primary" fullWidth>
              Add To Cart
            </Button>
            <Button variant="contained" color="primary" fullWidth>
              Buy Now
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* lover PArt */}

      <Box
        display="flex"
        flexDirection="row"
        m="auto"
        p="46px"
        gap={12}
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        textAlign="center"
      >
        <Box display="flex" alignItems="center" flexDirection="column">
          <Iconify
            icon="healthicons:yes"
            style={{ color: '#8ed425', height: '32px', width: '32px' }}
          />
          <Typography variant="h6" m="16px 0px 8px">
            {' '}
            100% Original
          </Typography>
          <Typography variant="p" m="16px 0px 8px">
            {' '}
            Chocolate bar candy canes ice cream toffee cookie halvah.
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Iconify
            icon="ic:baseline-watch-later"
            style={{ color: '#8ed425', height: '32px', width: '32px' }}
          />
          <Typography variant="h6" m="16px 0px 8px">
            10 Day Replacement
          </Typography>
          <Typography variant="p" m="16px 0px 8px">
            Marshmallow biscuit donut dragée fruitcake wafer.
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Iconify
            icon="iconamoon:shield-yes-fill"
            style={{ color: '#8ed425', height: '32px', width: '32px' }}
          />
          <Typography variant="h6" m="16px 0px 8px">
            Year Warranty
          </Typography>
          <Typography variant="p" m="16px 0px 8px">
            Cotton candy gingerbread cake I love sugar sweet.
          </Typography>
        </Box>
      </Box>

      <Grid container display="flex" flexDirection="column">
        <Grid>
          <Typography variant="body1" color="initial">
            {' '}
            Description:
          </Typography>
          <Space spacing={2} />
          <Box>
            <h6>Specifications</h6>
            <br />
            <ol>
              <li>Category</li>
              <li>Shoes</li>
            </ol>
            <br />
            <ol>
              <li>Manufacturer</li>
              <li>Nike</li>
            </ol>
            <br />
            <ol>
              <li>Serial Number</li>
              <li>358607726380311</li>
            </ol>
            <br />
            <ol>
              <li>Ships From</li>
              <li>United States</li>
            </ol>
            <br />
            <br />
            <h6>Product Details</h6>
            <br />
            <ul>
              <li>
                <p>The foam sockliner feels soft and comfortable</p>
              </li>
              <li>
                <p>Pull tab</p>
              </li>
              <li>
                <p>Not intended for use as Personal Protective Equipment</p>
              </li>
              <li>
                <p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p>
              </li>
              <li>
                <p>Style: 921826-109</p>
              </li>
              <li>
                <p>Country/Region of Origin: China</p>
              </li>
            </ul>
            <br />
            <br />
            <h6>Benefits</h6>
            <br />
            <ul>
              <li>
                <p>
                  Mesh and synthetic materials on the upper keep the fluid look of the OG while
                  adding comfort
                </p>
                and durability.
              </li>
              <li>
                <p>
                  Originally designed for performance running, the full-length Max Air unit adds
                  soft, comfortable cushio
                </p>
                ning underfoot.
              </li>
              <li>
                <p>The foam midsole feels springy and soft.</p>
              </li>
              <li>
                <p>The rubber outsole adds traction and durability.</p>
              </li>
            </ul>
            <br />
            <br />
            <h6>Delivery and Returns</h6>
            <br />
            <p>Your order of $200 or more gets free standard delivery.</p>
            <br />
            <ul>
              <li>
                <p>Standard delivered 4-5 Business Days</p>
              </li>
              <li>
                <p>Express delivered 2-4 Business Days</p>
              </li>
            </ul>
            <br />
            <p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Detail;
