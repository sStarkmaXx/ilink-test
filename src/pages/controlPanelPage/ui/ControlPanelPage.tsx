import { NavLink, Outlet } from 'react-router-dom';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import { Toast } from 'shared/ui/toast';
import css from './ControlPanelPage.module.scss';
import { useStore } from 'effector-react';
import { toastModel } from '../../../shared/ui/toast/model/toastModel';

export const ControlPanelPage = () => {
  const toast = useStore(toastModel.$toast);
  const toastError = useStore(toastModel.$toastError);
  const closeToast = () => {
    toastModel.showHideToast(null);
  };
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
      {toast && (
        <Toast closeToast={closeToast} error={toastError} text={toast} />
      )}
    </div>
  );
};
