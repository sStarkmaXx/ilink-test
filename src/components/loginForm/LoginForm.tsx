import css from './LoginForm.module.css';
import eye from './img/eye.png';
import { useState } from 'react';

export const LoginForm = () => {
  const [passwordHide, setPasswordHiden] = useState<boolean>(true);

  const onClickHandler = () => {
    setPasswordHiden(!passwordHide);
  };
  return (
    <form className={css.form} action="">
      <p>Войти</p>
      <label htmlFor="login">Логин</label>
      <input type="text" placeholder="Введите логин" id="login" />
      <label htmlFor="password">Пароль</label>
      <div className={css.password}>
        <input
          type={passwordHide ? 'password' : 'text'}
          placeholder="Введите пароль"
          id="password"
        />
        <div
          className={passwordHide ? css.hidden : css.open}
          onClick={onClickHandler}
        >
          <img src={eye} alt="" />
        </div>
      </div>
      <button>Войти</button>
      <p>Забыли пароль?</p>
    </form>
  );
};
