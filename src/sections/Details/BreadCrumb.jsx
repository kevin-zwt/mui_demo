import { Link, useLocation } from 'react-router-dom';

const BreadCrumb = () => {
  const location = useLocation();

  const { pathname } = location;
  const segments = pathname.split('/');
 
  const breadcrumbLinks = segments.map((segment, i) => {
    const url = `/${segment}`;

    return (
      <Link key={i} to={url} style={{ pointerEvents: i === segments.length - 1 && 'none' }}>
        {console.log(segment)}
        {i !== 0 && '>>'}
        {segment === '' ? 'home' : segment}
      </Link>
    );
  });
  return breadcrumbLinks;
};
export default BreadCrumb;
