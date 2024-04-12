/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async';

import { DetailView } from 'src/sections/Details';

// ----------------------------------------------------------------------

export default function DetailPage() {
  return (
    <>
      <Helmet>
        <title> Detail | Minimal UI </title>
      </Helmet>

      <DetailView />
    </>
  );
}
