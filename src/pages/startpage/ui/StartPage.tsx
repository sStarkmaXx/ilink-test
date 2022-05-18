import { Footer } from 'widgets/footer';
import { LoginForm } from 'widgets/loginForm';
import css from './StartPage.module.css';
import academy from '../img/academy.png';
import ilink from '../img/ilink.png';
import vector from '../img/vector.png';
import { Toast, toastModel } from 'shared/ui/toast';
import { useStore } from 'effector-react';

export const StartPage = () => {
  const toastText = useStore(toastModel.$toast);
  const closeToast = () => {
    toastModel.showHideToast(null);
  };

  return (
    <div
      className={css.startpage}
      style={{ backgroundImage: `url(${vector})` }}
    >
      <img src={ilink} alt="" />
      <img src={academy} alt="" />
      <div className={css.content}>
        <LoginForm />
      </div>
      {toastText && (
        <Toast closeToast={closeToast} error={true} text={toastText} />
      )}
      <Footer />
    </div>
  );
};
