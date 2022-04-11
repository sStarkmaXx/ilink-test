import css from './LoginForm.module.css';
import eye from './img/eye.png';
import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// type FormDataType = {
//   login: string;
//   password: string;
// };

export const LoginForm = () => {
  const [passwordHide, setPasswordHiden] = useState<boolean>(true);

  const onClickHandler = () => {
    setPasswordHiden(!passwordHide);
  };

  const [login, setLogin] = useState<string>('');

  const loginHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value);
  };

  const [password, setPassword] = useState<string>('');

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormDataType>({ mode: 'all' });

  // const onSubmit = handleSubmit((data) => {
  //   console.log(data, errors);
  // });

  const loginRegExp =
    /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/;

  const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,24}$/;
  return (
    <form
      className={css.form}
      action="" //onSubmit={onSubmit}
    >
      <p>Войти</p>
      <label htmlFor="login">Логин</label>
      <input
        // {...register('login', {
        //   required: true,
        //   pattern:
        //     /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/,
        // })}
        type="text"
        placeholder="Введите логин"
        id="login"
        //style={errors?.login && { border: '1px red solid' }}
        value={login}
        onChange={loginHandler}
      />
      <label htmlFor="password">Пароль</label>
      <div className={css.password}>
        <input
          // {...register('password', {
          //   required: true,
          //   pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,24}$/,
          // })}
          type={passwordHide ? 'password' : 'text'}
          placeholder="Введите пароль"
          id="password"
          onChange={passwordHandler}
          value={password}
        />
        <div
          className={passwordHide ? css.hidden : css.open}
          onClick={onClickHandler}
        >
          <img src={eye} alt="" />
        </div>
      </div>
      {/* <input type="submit" value={'Войти'} /> */}
      <button
        type="button"
        disabled={!loginRegExp.test(login) || !passwordRegExp.test(password)}
        onClick={() =>
          console.log(
            login,
            password,
            loginRegExp.test(login),
            passwordRegExp.test(password)
          )
        }
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
