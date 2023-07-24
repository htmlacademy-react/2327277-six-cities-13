import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>{'6 cities - Not found'}</title>
      </Helmet>
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Root}>Вернуться на главную</Link>
    </>
  );
}
