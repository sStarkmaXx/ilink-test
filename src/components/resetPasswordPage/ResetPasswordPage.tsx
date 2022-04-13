import { Footer } from '../footer/Footer';
import css from './ResetPasswordPage.module.css';
import academy from './img/academy.png';
import ilink from './img/ilink.png';
import vector from './img/vector.png';
import { ResetForm } from '../resetForm/ResetForm';
import { useState } from 'react';
import { Toast } from '../toast/Toast';

export type SendCode = null | 'error' | 'success';

export const ResetPasswordPage = () => {
  const [sendCode, setSendCode] = useState<SendCode>(null);

  const sendCodeSetter = (req: SendCode) => {
    setSendCode(req);
  };

  const closeToast = () => {
    setSendCode(null);
  };
  return (
    <div
      className={css.startpage}
      style={{ backgroundImage: `url(${vector})` }}
    >
      <img src={ilink} alt="" />
      <img src={academy} alt="" />
      <div className={css.content}>
        <ResetForm sendCodeSetter={sendCodeSetter} />
      </div>
      {(sendCode === 'success' && (
        <Toast
          closeToast={closeToast}
          error={null}
          text={'Код успешно отправлен!'}
        />
      )) ||
        (sendCode === 'error' && (
          <Toast
            closeToast={closeToast}
            error={'Error'}
            text={'Ошибка отправки кода!'}
          />
        ))}
      <Footer />
    </div>
  );
};
