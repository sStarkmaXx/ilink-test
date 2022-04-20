import { NavLink, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { Footer } from 'shared/ui/footer/Footer';
import { Header } from 'shared/ui/header/Header';
import css from './ControlPanelPage.module.scss';
import dataEmpty from './img/Group 137336586.png';
import drDown from './img/Arrow - Down 2.png';
import { useState } from 'react';
import { FilterType } from './HOCControlPanelPage';

type ControlPanelPagePropsType = {
  changeFilter: (filter: FilterType) => void;
  filter: FilterType;
};

export const ControlPanelPage: React.FC<ControlPanelPagePropsType> = ({
  changeFilter,
  filter,
}) => {
  const navigate = useNavigate();
  const toFirstPage = () => navigate('/controlPanel/accounts/1');
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const showDropDown = () => {
    setOpenDropDown(true);
  };

  const setFilter = (filter: FilterType) => {
    changeFilter(filter);
    setOpenDropDown(false);
    toFirstPage();
  };

  return (
    <div className={css.controlPanelPage}>
      <Header type={'controlPanelHeader'} />
      <div className={css.container}>
        <div className={css.navBar}>
          <NavLink
            to={'/controlPanel/accounts'}
            className={({ isActive }) =>
              isActive ? css.partyActive : css.party
            }
          >
            Участники
          </NavLink>
          <NavLink
            to={'/controlPanel/comments'}
            className={({ isActive }) => (isActive ? css.chatActive : css.chat)}
          >
            Отзывы
          </NavLink>
          <NavLink
            to={'/controlPanel/aboutMe'}
            className={({ isActive }) =>
              isActive ? css.paperActive : css.paper
            }
          >
            Обо мне
          </NavLink>
        </div>
        <div className={css.content}>
          <div className={css.header}>
            <span>{'Участники'}</span>
            <div className={css.dropdown}>
              <div className={css.window} onClick={showDropDown}>
                {filter}

                <img src={drDown} alt="" />
              </div>
              {openDropDown && (
                <ul>
                  <li onClick={() => setFilter('Все')}>{'Все'}</li>
                  <li onClick={() => setFilter('Отчислен')}>{'Отчислен'}</li>
                  <li onClick={() => setFilter('Обучается')}>{'Обучается'}</li>
                  <li onClick={() => setFilter('Закончил')}>{'Закончил'}</li>
                </ul>
              )}
            </div>
          </div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
