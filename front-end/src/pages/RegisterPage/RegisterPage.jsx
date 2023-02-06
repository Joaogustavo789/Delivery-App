import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Eye, EyeSlash, ArrowLeftSquare } from 'react-bootstrap-icons';
import { registerService } from '../../services/useLoginService';
import Button from '../LoginPage/components/Button';
import Input from '../LoginPage/components/Input';
import Label from '../LoginPage/components/Label';
import styles from './RegisterPage.module.css';
import logo from '../../images/silverio_lanches_logo.png';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isNameValid, setNameValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isRegisterBtnDisabled, setIsRegisterBtnDisabled] = useState(true);

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [emailExists, setEmailExist] = useState(true);

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
    setIsRegisterBtnDisabled(true);

    if (!isNameValid) return;
    if (!isEmailValid) return;
    if (!isPasswordValid) return;

    setIsRegisterBtnDisabled(false);
  }, [isNameValid, isEmailValid, isPasswordValid]);

  const handleClickInvalid = async () => {
    try {
      const response = await registerService({
        name,
        email,
        password,
      });

      localStorage.setItem('user', JSON.stringify(response));

      history.push('/customer/products');
    } catch (e) {
      console.log(e);
    }

    setEmailExist(true);
    if (email !== validateEmail(email) || name) {
      return setEmailExist(false);
    }
  };

  function handleOnClickPasswordEyeSvg() {
    setIsPasswordShown(!isPasswordShown);
  }

  return (
    <Container
      className={ `p-0 m-0 d-flex align-items-center
      ${styles.registerPageContainer} ${styles.registerPageBg}` }
      style={ { fontFamily: 'Roboto' } }
    >
      <Col
        xs={ { offset: 1, size: 10 } }
        sm={ { offset: 2, size: 8 } }
        md={ { offset: 3, size: 6 } }
        xl={ { offset: 4, size: 4 } }
        className="d-flex flex-column p-0"
        style={ {
          backgroundColor: '#EAF1EFCC',
          borderRadius: '4px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          zIndex: '1',
        } }
      >

        <Row
          className="d-flex justify-content-center
          align-items-center flex-column px-5 pt-4"
        >

          <img src={ logo } alt="" className="w-25" />

          <Label htmlFor="register-name-input" text="Nome">
            <Input
              type="text"
              id="register-name-input"
              placeholder="Seu nome"
              dataTestId="common_register__input-name"
              value={ name }
              onChange={ ({ target: { value } }) => setName(value) }
            />
          </Label>

          <Label htmlFor="register-email-input" text="Email">
            <Input
              type="text"
              id="register-email-input"
              placeholder="Seu email"
              dataTestId="common_register__input-email"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
            />
          </Label>

          <Label
            htmlFor="register-password-input"
            text="Senha"
            Svg={ isPasswordShown ? EyeSlash : Eye }
            svgOnClick={ () => handleOnClickPasswordEyeSvg() }
          >
            <Input
              type={ isPasswordShown ? 'text' : 'password' }
              id="register-password-input"
              placeholder="Sua senha"
              dataTestId="common_register__input-password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
            />
          </Label>

          <Button
            dataTestId="common_register__button-register"
            disabled={ isRegisterBtnDisabled }
            onClick={ handleClickInvalid }
            style={ {
              backgroundColor: '#034C6B',
              color: 'white',
              opacity: isRegisterBtnDisabled && '0.6',
              transition: '200ms',
            } }
          >
            Cadastrar
          </Button>

          <Button
            onClick={ () => history.push('/login') }
            style={ {
              backgroundColor: '#EAF1EFCC',
              color: '#034C6B',
              borderColor: '#034C6B' } }
          >
            <span>
              Tela de Login
            </span>

            <ArrowLeftSquare
              strokeWidth="2px"
              className="ms-3"
              width={ 24 }
              height={ 24 }
            />
          </Button>

          <p
            data-testid="common_register__element-invalid_register"
            className="text-center text-danger fw-bold pt-3"
          >
            &nbsp;
            {' '}
            { !emailExists && 'This email is already is use' }
          </p>
        </Row>
      </Col>

    </Container>
  );
}

export default RegisterPage;
