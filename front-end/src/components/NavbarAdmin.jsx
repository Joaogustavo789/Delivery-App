import { useHistory } from 'react-router-dom';
import '../pages/AdminPage/AdminPage.css';

function NavbarAdmin() {
  const history = useHistory();

  function handleOnClickLoggout() {
    localStorage.clear();
    history.push('/login');
  }

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="navbarAdminPage d-flex justify-content-between">
      <span
        className="text-white font-Roboto fs-4 fw-bold"
        data-testid="customer_products__element-navbar-link-orders"
      >
        GERENCIAR USUÁRIOS
      </span>

      <span
        className="text-white font-Roboto fs-4 fw-light"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {user?.name}
      </span>

      <button
        onClick={ handleOnClickLoggout }
        type="button"
        className="btnSair text-white font-Roboto fs-4 fw-light"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </header>
  );
}

export default NavbarAdmin;
