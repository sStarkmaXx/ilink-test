import { Footer } from '../footer/Footer';
import { LoginForm } from '../loginForm/LoginForm';
import css from './StartPage.module.css';
import academy from './img/academy.png';
import ilink from './img/ilink.png';
import vector from './img/vector.png';

export const StartPage = () => {
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
      <Footer />
    </div>
  );
};
