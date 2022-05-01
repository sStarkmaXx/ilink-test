import { Footer } from 'shared/ui/footer/Footer';
import { LoginForm } from 'components/loginForm/LoginForm';
import css from './StartPage.module.css';
import academy from './img/academy.png';
import ilink from './img/ilink.png';
import vector from './img/vector.png';
import { useState } from 'react';
import { Toast } from 'shared/ui/toast/Toast';

export const StartPage = () => {
  const [accountError, setAccountError] = useState<string | null>(null);

  const accountErrorSetter = (text: string) => {
    setAccountError(text);
    setTimeout(() => setAccountError(null), 2000);
  };

  const closeToast = () => {
    setAccountError(null);
  };

  return (
    <div
      className={css.startpage}
      style={{ backgroundImage: `url(${vector})` }}
    >
      <img src={ilink} alt="" />
      <img src={academy} alt="" />
      <div className={css.content}>
        <LoginForm accountErrorSetter={accountErrorSetter} />
      </div>
      {accountError && (
        <Toast
          closeToast={closeToast}
          error={accountError}
          text={accountError}
        />
      )}
      <Footer />
    </div>
  );
};
