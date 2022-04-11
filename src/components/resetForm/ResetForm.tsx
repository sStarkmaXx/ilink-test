import css from './ResetForm.module.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const ResetForm = () => {
  const [passwordHide, setPasswordHiden] = useState<boolean>(true);

  const onClickHandler = () => {
    setPasswordHiden(!passwordHide);
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
      <input type="text" placeholder="Valievaya@gmail.com" id="login" />
      <div className={css.buttons}>
        <button>Сбросить</button>
        <NavLink to={'/'}>Отмена</NavLink>
      </div>
    </form>
  );
};
