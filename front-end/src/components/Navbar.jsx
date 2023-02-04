import { Link, useHistory } from 'react-router-dom';
import './styles/NavBarProducts.css';
import logo from '../images/silverio_lanches_logo.png';

export default function Navbar() {
  const history = useHistory();
  function handleOnClickLoggout() {
    localStorage.clear();
    history.push('/login');
  }

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header
      className="navbarProductsPage d-flex shadow-sm
    justify-content-between align-items-center px-5 py-2"
    >
      <div className="d-flex gap-4 align-items-center">
        <img src={ logo } alt="logo" className="logoProductsPage" />
        <div>
          <Link
            className="text-white font-Roboto fs-5 fw-bold text-decoration-none"
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            PRODUTOS
          </Link>
        </div>
        <div>
          <Link
            className="text-white font-Roboto fs-5 fw-bold text-decoration-none"
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            MEUS PEDIDOS
          </Link>
        </div>
      </div>

      <span
        className="text-white font-Roboto fs-5
          fw-light ps-2 sm:text-danger navbar_username"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {user?.name}
      </span>

      <button
        className="btnSairProducts text-white font-Roboto fs-5 fw-light me-2"
        onClick={ handleOnClickLoggout }
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </header>
  );
}
