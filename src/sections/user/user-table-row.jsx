import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
// eslint-disable-next-line perfectionist/sort-imports
import { userAction } from 'src/actions';
// eslint-disable-next-line import/no-extraneous-dependencies, perfectionist/sort-imports
import { useDispatch } from 'react-redux';
// eslint-disable-next-line perfectionist/sort-imports, perfectionist/sort-named-imports

// eslint-disable-next-line perfectionist/sort-imports

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  handleEdit,
  selected,
  name,
  company,
  role,
  verified,
  status,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEditBtn = () => {
    handleEdit(id);
    handleCloseMenu();
  };
  const handleDeleteBtn = () => {
    dispatch(userAction.removeUser(id));
    handleCloseMenu();
  };

  return (
    <>
  
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{company}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell align="center">{verified}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEditBtn}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteBtn} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.number,
  handleEdit: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  verified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
