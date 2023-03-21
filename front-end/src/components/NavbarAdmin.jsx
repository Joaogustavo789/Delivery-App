import { useHistory } from 'react-router-dom';
import './styles/NavBarAdmin.css';
import logo from '../images/silverio_lanches_logo.png';

function NavbarAdmin() {
  const history = useHistory();

  function handleOnClickLoggout() {
    localStorage.clear();
    history.push('/login');
  }

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header
      className="navbarAdminPage d-flex shadow-sm
    justify-content-between align-items-center px-5 py-2"
    >
      <div className="d-flex gap-4 align-items-center">
        <img src={ logo } alt="logo" className="logo" />
        <span
          className="text-white font-Roboto fs-5 fw-bold"
          data-testid="customer_products__element-navbar-link-orders"
        >
          GERENCIAR USUÁRIOS
        </span>
      </div>

      <div className="d-flex gap-4 align-items-center">
        <span
          className="text-white font-Roboto fs-5 fw-light ps-2"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user?.name}
        </span>
        <button
          onClick={ handleOnClickLoggout }
          type="button"
          className="btnSair text-white font-Roboto fs-5 fw-light me-2"
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </div>
    </header>
  );
}

export default NavbarAdmin;
