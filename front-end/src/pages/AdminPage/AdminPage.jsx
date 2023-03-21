import { Container, Row, Col } from 'reactstrap';
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
      <Container sm="12">
        <h3 className="font-Roboto fs-2 fw-light mt-3">Cadastrar novo usuário.</h3>
        <Row>
          <section
            className="
          shadow-sm p-3 mb-5 bg-body rounded d-flex
          gap-2 align-items-center justify-content-center"
          >
            <Col xs="2">
              Nome
              <input
                id="name"
                className="nameInput"
                type="text"
                data-testid="admin_manage__input-name"
                placeholder="Nome e sobrenome"
                value={ name }
                onChange={ ({ target: { value } }) => setName(value) }
              />
            </Col>

            <Col xs="2">
              <span className="ms-1">Email</span>
              <input
                id="email"
                className="emailInput"
                type="email"
                data-testid="admin_manage__input-email"
                placeholder="seu-email@site.com.br"
                value={ email }
                onChange={ ({ target: { value } }) => setEmail(value) }
              />
            </Col>

            <Col xs="2">
              <span className="ms-1">Senha</span>
              <input
                className="passwordInput"
                type="password"
                data-testid="admin_manage__input-password"
                placeholder="********"
                value={ password }
                onChange={ ({ target: { value } }) => setPassword(value) }
              />
            </Col>

            <Col xs="2" className="d-flex flex-column">
              <span className="ms-1">Tipo</span>
              <select
                id="Tipo"
                className="roleSelect"
                data-testid="admin_manage__select-role"
                name="select"
                value={ role }
                onChange={ ({ target: { value } }) => setRole(value) }
              >
                <option data-testid="select-option" value="default">Default</option>
                <option data-testid="select-option" value="seller">Vendedor</option>
                <option data-testid="select-option" value="customer">Cliente</option>
              </select>
            </Col>

            <Col xs="2" className="align-self-end">
              <button
                className="btnCadastrar text-white font-Roboto fs-5"
                type="button"
                data-testid="admin_manage__button-register"
                disabled={ adminRegisBtnDisable }
                onClick={ handleClickAdminRegister }
              >
                Cadastrar
              </button>
            </Col>
            { !errorMessage && (
              <p
                data-testid="admin_manage__element-invalid-register"
              >
                Register invalid!
              </p>
            )}
          </section>
        </Row>

        <h3 className="font-Roboto fs-2 fw-light">Lista de Usuários.</h3>

        <section className="sectionTable shadow-sm p-3 mb-5 bg-body rounded">
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
