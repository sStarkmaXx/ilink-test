import { NavLink, Route, Routes } from 'react-router-dom';
import { Footer } from 'shared/ui/footer/Footer';
import { Header } from 'shared/ui/header/Header';
import css from './ControlPanelPage.module.scss';
import dataEmpty from './img/Group 137336586.png';
import drDown from './img/Arrow - Down 2.png';
import { AccountList } from '../../entities/account/model/AccountList';
import { useState } from 'react';
import { AccountType } from '../../entities/account/ui/Account';
import { accounts } from 'entities/account/model/accounts';

export type FilterType = 'Все' | 'Обучается' | 'Закончил' | 'Отчислен';

export const ControlPanelPage = () => {
  const [filter, setFilter] = useState<FilterType>('Все');
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [filteredAccounts, setFilteredAccounts] =
    useState<AccountType[]>(accounts);

  const filterAccount = (filter: FilterType) => {
    if (filter === 'Все') {
      setFilteredAccounts(accounts);
    } else {
      let filteredAccs = accounts.filter((acc) => acc.status === filter);
      setFilteredAccounts(filteredAccs);
    }
  };

  const onClickFilter = (filter: FilterType) => {
    setFilter(filter);
    setOpenDropDown(false);
    filterAccount(filter);
  };

  const onClickDrop = () => {
    setOpenDropDown(true);
  };

  return (
    <div className={css.controlPanelPage}>
      <Header type={'controlPanelHeader'} />
      <div className={css.container}>
        <div className={css.navBar}>
          <NavLink
            to={'accounts'}
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
          <div className={css.header}>
            <span>{'Участники'}</span>
            <div className={css.dropdown}>
              <div className={css.window} onClick={onClickDrop}>
                {filter}

                <img src={drDown} alt="" />
              </div>
              {openDropDown && (
                <ul>
                  <li onClick={() => onClickFilter('Все')}>{'Все'}</li>
                  <li onClick={() => onClickFilter('Отчислен')}>
                    {'Отчислен'}
                  </li>
                  <li onClick={() => onClickFilter('Обучается')}>
                    {'Обучается'}
                  </li>
                  <li onClick={() => onClickFilter('Закончил')}>
                    {'Закончил'}
                  </li>
                </ul>
              )}
            </div>
          </div>
          <Routes>
            <Route
              path={'/profile/controlPanel/accounts'}
              element={<AccountList filteredAccounts={filteredAccounts} />}
            ></Route>
            <Route path={'comments'} element={'Отзывы'}></Route>
            <Route path={'aboutMe'} element={'Обо мне'}></Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
