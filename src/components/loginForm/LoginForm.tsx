import css from './LoginForm.module.css';
import eye from './img/eye.png';
import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
//import { useForm } from 'react-hook-form';

// type FormDataType = {
//   login: string;
//   password: string;
// };

type LoginFormPropsType = {
  accountErrorSetter: (text: string) => void;
};

export const LoginForm: React.FC<LoginFormPropsType> = ({
  accountErrorSetter,
}) => {
  const loginRegExp =
    /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/;

  const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,24}$/;

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
        : setLoginError('Логин Ваша электронная почта');
    } else {
      setLoginError('Обязательно введите логин!');
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
  //----------------------------------------------------------
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormDataType>({ mode: 'all' });

  // const onSubmit = handleSubmit((data) => {
  //   console.log(data, errors);
  // });
  //-------------------------------------------------------------------

  return (
    <form
      className={css.form}
      action="" //onSubmit={onSubmit}
    >
      <p>Войти</p>
      <label htmlFor="login">Логин</label>
      <input
        //---------------------------------------------------------------------------------------
        // {...register('login', {
        //   required: true,
        //   pattern:
        //     /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/,
        // })}
        //----------------------------------------------------------------------------------------
        type="text"
        placeholder="Введите логин"
        id="login"
        //----------------------------------------------------------------------------------
        //style={errors?.login && { border: '1px red solid' }}
        //--------------------------------------------------------------------------------------
        value={login}
        onChange={loginHandler}
        onBlur={loginBlurHandler}
        style={loginError ? { border: '1px solid #EB5757' } : {}}
      />
      <label htmlFor="password">Пароль</label>
      <div
        className={css.password}
        style={passError ? { border: '1px solid #EB5757' } : {}}
      >
        <input
          //------------------------------------------------------------------------------------------
          // {...register('password', {
          //   required: true,
          //   pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,24}$/,
          // })}
          //----------------------------------------------------------------------------------
          type={passwordHide ? 'password' : 'text'}
          placeholder="Введите пароль"
          id="password"
          onChange={passwordHandler}
          value={password}
          onBlur={passBlurHandler}
        />

        <div
          className={passwordHide ? css.hidden : css.open}
          onClick={onClickHandler}
          style={{ backgroundImage: `url(${eye})` }}
        ></div>
        {passError && (
          <div className={css.error} data-title={passError}>
            !
          </div>
        )}
      </div>

      {/* <input type="submit" value={'Войти'} /> */}
      <button
        type="button"
        disabled={!loginRegExp.test(login) || !passwordRegExp.test(password)}
        onClick={() => {
          if (login === account.login) {
            if (password === account.password) {
              document.location = '/profile';
            } else {
              setTimeout(() => accountErrorSetter('Неверный пароль!'), 2000);
            }
          } else {
            setTimeout(
              () =>
                accountErrorSetter('Данный пользователь не зарегистрирован!'),
              2000
            );
          }
        }}
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
