import { Footer } from '../footer/Footer';
import css from './ResetPasswordPage.module.css';
import academy from './img/academy.png';
import ilink from './img/ilink.png';
import vector from './img/vector.png';
import { ResetForm } from '../resetForm/ResetForm';

export const ResetPasswordPage = () => {
  return (
    <div
      className={css.startpage}
      style={{ backgroundImage: `url(${vector})` }}
    >
      <img src={ilink} alt="" />
      <img src={academy} alt="" />
      <div className={css.content}>
        <ResetForm />
      </div>
      <Footer />
    </div>
  );
};
