import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { loginService } from '../../services/useLoginService';
import Button from './components/Button';
import Input from './components/Input';
import styles from './LoginPage.module.css';
import Label from './components/Label';
import logo from '../../images/silverio_lanches_logo.png';

export default function LoginPage() {
  const [doesUserExist, setDoesUserExist] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  function getIsValidEmailByStr(str) {
    return /\S+@\S+\.\S+/.test(str);
  }

  useEffect(() => {
    setIsValidEmail(getIsValidEmailByStr(email));
  }, [email]);

  useEffect(() => {
    setIsValidPassword(false);

    const MIN_PASSWORD_LENGTH = 6;
    if (password.length < MIN_PASSWORD_LENGTH) return;

    setIsValidPassword(true);
  }, [password]);

  useEffect(() => {
    setIsLoginBtnDisabled(true);

    if (!isValidEmail) return;
    if (!isValidPassword) return;

    setIsLoginBtnDisabled(false);
  }, [isValidEmail, isValidPassword]);

  function redirectToManageWhenAdministrator(role) {
    if (role !== 'administrator') return;
    history.push('/admin/manage');
  }

  function redirectToOrdersWhenSeller(role) {
    if (role !== 'seller') return;
    history.push('/seller/orders');
  }

  function redirectToProductsWhenCustomer(role) {
    if (role !== 'customer') return;
    history.push('/customer/products');
  }

  function redirectUserByRole(role) {
    redirectToManageWhenAdministrator(role);
    redirectToOrdersWhenSeller(role);
    redirectToProductsWhenCustomer(role);
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      const { role } = userData;

      redirectUserByRole(role);
    }
  }, []);

  async function handleOnClickLoginBtn() {
    setDoesUserExist(true);

    try {
      const response = await loginService({
        email,
        password,
      });

      // console.log('Login response:', response);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      redirectUserByRole(response.data.user.role);
    } catch (e) {
      setDoesUserExist(false);
      console.log(e);
    }
  }

  return (
    <Container
      className={ `p-0 m-0 d-flex align-items-center
        ${styles.loginPageContainer} ${styles.loginPageBg}` }
      style={ { fontFamily: 'Roboto' } }
    >
      <Col
        xs={ { offset: 1, size: 10 } }
        sm={ { offset: 2, size: 8 } }
        md={ { offset: 3, size: 6 } }
        xl={ { offset: 4, size: 4 } }
        className="d-flex flex-column p-0 pt-4"
        style={ {
          backgroundColor: '#EAF1EFCC',
          borderRadius: '4px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          zIndex: '1',
        } }
      >
        <Row
          className="d-flex justify-content-center
          align-items-center flex-column px-5"
        >

          <img src={ logo } alt="" className="w-25" />

          <h2 className="text-center pt-1 mb-0">
            Login
          </h2>

          <Label htmlFor="login-email-input" text="Email">

            <Input
              type="text"
              id="login-email-input"
              dataTestId="common_login__input-email"
              placeholder="email@tryber.com.br"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
              label="Login"
            />
          </Label>

          <Label htmlFor="login-password-input" text="Password">

            <Input
              type="password"
              id="login-password-input"
              dataTestId="common_login__input-password"
              placeholder="Password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
              label="Senha"
              labelHtmlFor="login-password-input"
            />
          </Label>

          <Button
            dataTestId="common_login__button-login"
            onClick={ () => handleOnClickLoginBtn() }
            disabled={ isLoginBtnDisabled }
            style={ {
              backgroundColor: '#034C6B',
              color: 'white',
              opacity: isLoginBtnDisabled && '0.6',
              transition: '200ms',
            } }
          >
            Login
          </Button>

          <Button
            dataTestId="common_login__button-register"
            onClick={ () => { history.push('/register'); } }
            style={ {
              backgroundColor: '#EAF1EFCC',
              color: '#034C6B',
              borderColor: '#034C6B',
            } }
          >
            Ainda não tenho conta
          </Button>

          <p
            data-testid="common_login__element-invalid-email"
            className="text-center text-danger fw-bold pt-2"
          >
              &nbsp;
            { !doesUserExist && 'This email is invalid!' }
          </p>

        </Row>
      </Col>
    </Container>
  );
}
