/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async';

import { Register } from 'src/sections/register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> register | Minimal UI </title>
      </Helmet>

      <Register />
    </>
  );
}
