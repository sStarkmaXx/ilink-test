import { NavLink, Outlet } from 'react-router-dom';
import { Footer } from 'shared/ui/footer/Footer';
import { Header } from 'shared/ui/header/Header';
import css from './ControlPanelPage.module.scss';

export const ControlPanelPage = () => {
  return (
    <div className={css.controlPanelPage}>
      <Header type={'controlPanelHeader'} />
      <div className={css.container}>
        <div className={css.navBar}>
          <NavLink
            to={'/ilink-test/controlPanel/accounts'}
            className={({ isActive }) =>
              isActive ? css.partyActive : css.party
            }
          >
            Участники
          </NavLink>
          <NavLink
            to={'/ilink-test/controlPanel/comments'}
            className={({ isActive }) => (isActive ? css.chatActive : css.chat)}
          >
            Отзывы
          </NavLink>
          <NavLink
            to={'/ilink-test/controlPanel/aboutMe'}
            className={({ isActive }) =>
              isActive ? css.paperActive : css.paper
            }
          >
            Обо мне
          </NavLink>
        </div>
        <div className={css.content}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
