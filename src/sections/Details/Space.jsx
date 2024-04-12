/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';

const Space = (props) => {
  const { spacing } = props;
  return <Box my={spacing} />;
};
export default Space;
