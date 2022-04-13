import css from './ResetForm.module.css';
import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SendCode } from '../resetPasswordPage/ResetPasswordPage';

type ResetFormPropsType = {
  sendCodeSetter: (req: SendCode) => void;
};

export const ResetForm: React.FC<ResetFormPropsType> = ({ sendCodeSetter }) => {
  const loginRegExp =
    /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/;

  const [login, setLogin] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const loginHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value);
    setLoginError(null);
  };

  const loginBlurHandler = () => {
    if (login.trim() !== '') {
      loginRegExp.test(login)
        ? setLoginError(null)
        : setLoginError('Не верный формат электронный почты!');
    } else {
      setLoginError('Введите Ваш логин!');
    }
  };

  const loginOnClickHandler = () => {
    setLogin('');
    setTimeout(() => {
      if (loginRegExp.test(login)) {
        if (Math.random() < 0.5) {
          sendCodeSetter('error');
        } else {
          sendCodeSetter('success');
        }
      }
    }, 2000);
  };

  return (
    <form className={css.form} action="">
      <div className={css.header}>
        <NavLink to={'/'}>
          <div className={css.arrow}></div>
        </NavLink>
        <p>Сброс пароля</p>
      </div>
      <label htmlFor="login">Электронная почта</label>
      {/* <input type="text" placeholder="Valievaya@gmail.com" id="login" /> */}
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
      <div className={css.buttons}>
        <button
          type="button"
          disabled={!loginRegExp.test(login) || login.trim() === ''}
          className={
            !loginRegExp.test(login) || login.trim() === ''
              ? css.disable
              : css.enable
          }
          onClick={loginOnClickHandler}
        >
          Сбросить
        </button>
        <NavLink to={'/'}>Отмена</NavLink>
      </div>
    </form>
  );
};
