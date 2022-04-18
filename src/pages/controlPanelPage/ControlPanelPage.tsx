import { NavLink } from 'react-router-dom';
import { Footer } from 'shared/ui/footer/Footer';
import { Header } from 'shared/ui/header/Header';
import css from './ControlPanelPage.module.scss';
import dataEmpty from './img/Group 137336586.png';

export const ControlPanelPage = () => {
  const accounts = [];
  return (
    <div className={css.controlPanelPage}>
      <Header type={'controlPanelHeader'} />
      <div className={css.container}>
        <div className={css.navBar}>
          <NavLink
            to={'/asd'}
            className={({ isActive }) =>
              isActive ? css.partyActive : css.party
            }
          >
            Участники
          </NavLink>
          <NavLink
            to={'/dfg'}
            className={({ isActive }) => (isActive ? css.chatActive : css.chat)}
          >
            Отзывы
          </NavLink>
          <NavLink
            to={'/as'}
            className={({ isActive }) =>
              isActive ? css.paperActive : css.paper
            }
          >
            Обо мне
          </NavLink>
        </div>
        <div className={css.content}>
          <img src={dataEmpty} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
};
