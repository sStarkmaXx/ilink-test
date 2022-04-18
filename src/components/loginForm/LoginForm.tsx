import css from './LoginForm.module.css';
import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { emailRegExp as loginRegExp } from 'shared/regexp/emailRegexp';
import { passwordRegExp } from 'shared/regexp/passwordRegExp';

type LoginFormPropsType = {
  accountErrorSetter: (text: string) => void;
};

export const LoginForm: React.FC<LoginFormPropsType> = ({
  accountErrorSetter,
}) => {
  const [passwordHide, setPasswordHiden] = useState<boolean>(true);

  const onClickHandler = () => {
    setPasswordHiden(!passwordHide);
  };

  const [login, setLogin] = useState<string>('');

  const loginHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value);
    setLoginError(null);
  };

  const [password, setPassword] = useState<string>('');

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    setPassError(null);
  };

  const [loginError, setLoginError] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);

  const loginBlurHandler = () => {
    if (login.trim() !== '') {
      loginRegExp.test(login)
        ? setLoginError(null)
        : setLoginError('Логин - Ваша электронная почта');
    } else {
      setLoginError('Введите Ваш логин!');
    }
  };

  const passBlurHandler = () => {
    if (password.trim() !== '') {
      passwordRegExp.test(password)
        ? setPassError(null)
        : setPassError(
            'Пароль должен содержать строчные и прописные латинские буквы, цифры и знаки!'
          );
    } else {
      setPassError('Введите пароль!');
    }
  };

  const account = {
    login: 'test@test.test',
    password: 'qweQWE123!@#',
  };

  const formOnClickHandler = () => {
    setLogin('');
    setPassword('');
    if (login === account.login) {
      if (password === account.password) {
        document.location = '#/profile';
      } else {
        setTimeout(() => accountErrorSetter('Неверный пароль!'), 2000);
      }
    } else {
      setTimeout(
        () => accountErrorSetter('Данный пользователь не зарегистрирован!'),
        2000
      );
    }
  };

  return (
    <form
      className={css.form}
      action="" //onSubmit={onSubmit}
    >
      <p>Войти</p>
      <label htmlFor="login">Логин</label>
      <div
        className={css.login}
        style={
          loginError
            ? { border: '1px solid #EB5757' }
            : login.trim() !== ''
            ? { border: '1px solid #585CC6' }
            : {}
        }
      >
        <input
          type="text"
          placeholder="Введите логин"
          id="login"
          value={login}
          onChange={loginHandler}
          onBlur={loginBlurHandler}
        />
        {loginError && (
          <div className={css.error} data-title={loginError}></div>
        )}
      </div>

      <label htmlFor="password">Пароль</label>
      <div
        className={css.password}
        style={
          passError
            ? { border: '1px solid #EB5757' }
            : password.trim() !== ''
            ? { border: '1px solid #585CC6' }
            : {}
        }
      >
        <input
          type={passwordHide ? 'password' : 'text'}
          placeholder="Введите пароль"
          id="password"
          onChange={passwordHandler}
          value={password}
          onBlur={passBlurHandler}
        />
        <div
          className={passwordHide ? css.hide : css.show}
          onClick={onClickHandler}
        ></div>
        {passError && <div className={css.error} data-title={passError}></div>}
      </div>
      <button
        type="button"
        disabled={!loginRegExp.test(login) || !passwordRegExp.test(password)}
        onClick={formOnClickHandler}
        className={
          !loginRegExp.test(login) || !passwordRegExp.test(password)
            ? css.disable
            : css.enable
        }
      >
        Войти
      </button>
      <NavLink to={'/respas'}>Забыли пароль?</NavLink>
    </form>
  );
};
