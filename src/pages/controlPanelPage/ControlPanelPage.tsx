import { NavLink, Route, Routes } from 'react-router-dom';
import { Footer } from 'shared/ui/footer/Footer';
import { Header } from 'shared/ui/header/Header';
import css from './ControlPanelPage.module.scss';
import dataEmpty from './img/Group 137336586.png';
import { AccountList } from '../../entities/account/model/AccountList';

export const ControlPanelPage = () => {
  const accounts = [];
  return (
    <div className={css.controlPanelPage}>
      <Header type={'controlPanelHeader'} />
      <div className={css.container}>
        <div className={css.navBar}>
          <NavLink
            to={'/accounts'}
            className={({ isActive }) =>
              isActive ? css.partyActive : css.party
            }
          >
            Участники
          </NavLink>
          <NavLink
            to={'/comments'}
            className={({ isActive }) => (isActive ? css.chatActive : css.chat)}
          >
            Отзывы
          </NavLink>
          <NavLink
            to={'/aboutMe'}
            className={({ isActive }) =>
              isActive ? css.paperActive : css.paper
            }
          >
            Обо мне
          </NavLink>
        </div>
        <div className={css.content}>
          <Routes>
            <Route path={'accounts'} element={<AccountList />}></Route>
            <Route path={'comments'} element={'Отзывы'}></Route>
            <Route path={'aboutMe'} element={'Обо мне'}></Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
