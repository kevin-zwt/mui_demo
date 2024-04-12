import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';
// eslint-disable-next-line perfectionist/sort-imports

// eslint-disable-next-line perfectionist/sort-imports

// eslint-disable-next-line perfectionist/sort-imports, perfectionist/sort-named-imports

// ----------------------------------------------------------------------

export default function ShopProductCard({ product, handleClick, selected }) {
  const renderStatus = (
    <Label
      variant="filled"
      color={(product.status === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.priceSale && fCurrency(product.priceSale)}
      </Typography>
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  const isSelected = selected.includes(product.id);


  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={handleClick}>
      <Card style={{ cursor: 'pointer', backgroundColor: isSelected ? ' #959595' : '' }}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {product.status && renderStatus}

          {renderImg}
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
            {product.name}
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <ColorPreview colors={product.colors} />
           
            {renderPrice}
          </Stack>
        </Stack>
      </Card>
    </div>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
  handleClick: PropTypes.any,
  selected: PropTypes.any,
};
