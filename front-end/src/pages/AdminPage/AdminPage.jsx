import { Container } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavbarAdmin from '../../components/NavbarAdmin';
import adminService from '../../services/postAdminManagement';
import RenderUserAdmin from './components/AdminPageUser';
import './AdminPage.css';

function AdminPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('default');

  const [isNameValid, setNameValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isSelectValid, setSelectValid] = useState(false);

  const [errorMessage, setErrorMessage] = useState(true);

  const [adminRegisBtnDisable, setAdminRegisBtnDisable] = useState(true);

  const [refresh, setRefresh] = useState(false);

  const history = useHistory();

  const validateEmail = (emailString) => /\S+@\S+\.\S+/.test(emailString);

  useEffect(() => {
    setNameValid(false);

    const MIN_NAME_LENGTH = 12;
    if (name.length < MIN_NAME_LENGTH) return;

    setNameValid(true);
  }, [name]);

  useEffect(() => {
    setEmailValid(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setPasswordValid(false);

    const MIN_PASSWORD_LENGTH = 6;

    if (password.length < MIN_PASSWORD_LENGTH) return;

    setPasswordValid(true);
  }, [password]);

  useEffect(() => {
    setSelectValid(false);

    if (role === 'default') return;

    setSelectValid(true);
  }, [role]);

  useEffect(() => {
    setAdminRegisBtnDisable(true);

    if (!isNameValid) return;
    if (!isEmailValid) return;
    if (!isPasswordValid) return;
    if (!isSelectValid) return;

    setAdminRegisBtnDisable(false);
  }, [isNameValid, isEmailValid, isPasswordValid, isSelectValid]);

  const handleClickAdminRegister = async () => {
    setRefresh(true);
    const getToken = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await adminService({
        name,
        email,
        password,
        role,
      }, getToken.token);

      history.push('/admin/manage');
      console.log(response);
      setErrorMessage(true);
    } catch (e) {
      setErrorMessage(false);
      console.log(e);
    }
    setRefresh(false);
  };

  return (
    <main>
      <NavbarAdmin />
      <Container sm="12" className="border border-primary">
        <h3 className="font-Roboto fs-2 fw-light">Cadastrar novo usuário.</h3>
        <section className="shadow-sm p-3 mb-5 bg-body rounded">
          <span>Nome</span>
          <input
            className="input-group-text"
            type="text"
            data-testid="admin_manage__input-name"
            placeholder="Nome e sobrenome"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
          />
          <span>Email</span>
          <input
            className="input-group-text"
            type="email"
            data-testid="admin_manage__input-email"
            placeholder="seu-email@site.com.br"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
          <span>Senha</span>
          <input
            className="input-group-text"
            type="password"
            data-testid="admin_manage__input-password"
            placeholder="********"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
          <span>Tipo</span>
          <select
            className="input-group-text"
            data-testid="admin_manage__select-role"
            name="select"
            value={ role }
            onChange={ ({ target: { value } }) => setRole(value) }
          >
            <option data-testid="select-option" value="default">Default</option>
            <option data-testid="select-option" value="seller">Vendedor</option>
            <option data-testid="select-option" value="customer">Cliente</option>
          </select>
          <button
            className="btnCadastrar text-white"
            type="button"
            data-testid="admin_manage__button-register"
            disabled={ adminRegisBtnDisable }
            onClick={ handleClickAdminRegister }
          >
            Cadastrar
          </button>
          { !errorMessage && (
            <p
              data-testid="admin_manage__element-invalid-register"
            >
              Register invalid!
            </p>
          )}
        </section>

        <h3 className="font-Roboto fs-2 fw-light">Lista de Usuários.</h3>

        <section className="shadow-sm p-3 mb-5 bg-body rounded">
          <RenderUserAdmin
            refresh={ refresh }
            setRefresh={ setRefresh }
          />
        </section>
      </Container>
    </main>
  );
}

export default AdminPage;
