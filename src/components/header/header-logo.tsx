import { Link } from 'react-router-dom';

export default function HeaderLogo() {
  return (
    <div className="header__left">
      <Link to="/" title="Go Home" className="header__logo-link">
        <img
          className="header__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={81}
          height={41}
        />
      </Link>
    </div>
  );
}
