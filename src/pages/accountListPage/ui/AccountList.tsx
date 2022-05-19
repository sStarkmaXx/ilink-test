import { MouseEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Account } from 'pages/account';
import css from './AccountList.module.scss';
import drDown from '../img/Arrow - Down 2.png';
import { useStore } from 'effector-react';
import { accountType } from 'entities/account/model/accountModel';
import { AccountSkeleton } from 'pages/account/ui/accountSkeleton/AccountSkeleton';
import dataEmpty from 'pages/controlPanelPage/img/Group137336586.png';
import { accountModel } from 'entities/account/model/accountModel';

export type AccountFilterType = string;

export const AccountList = () => {
  const accounts = useStore(accountModel.$accounts);
  useEffect(() => {
    accountModel.getAccounts();
  }, []);
  useEffect(() => {
    setFilteredAccounts(accounts);
  }, [accounts]);
  const isLoading = useStore(accountModel.$loadingAccounts);

  //-----------------------------фильтр аккаунтов-----------------------------------------
  const [accountFilter, setAccountFilter] = useState<AccountFilterType>('Все');
  const [filteredAccounts, setFilteredAccounts] =
    useState<accountType[]>(accounts);

  const filterAccount = (filter: AccountFilterType) => {
    if (filter === 'Все') {
      setFilteredAccounts(accounts);
    } else {
      let filteredAccs = accounts.filter((acc) => acc.academyStatus === filter);
      setFilteredAccounts(filteredAccs);
    }
  };

  const changeAccountFilter = (filter: AccountFilterType) => {
    setAccountFilter(filter);
    filterAccount(filter);
  };

  //-----------------------------------------------------pagination--------------------------------------
  const step = 6;
  const [allPages, setAllPages] = useState<number>(0);
  const [backAllPages, setBackAllPages] = useState<number>(0);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [accountsForPage, setAccountsForPage] = useState<accountType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const accountsForPageFilter = () => {
    let filteredAccs = [];
    for (let i = startIndex; i < startIndex + step; i++) {
      if (filteredAccounts[i] === undefined) {
        break;
      } else {
        filteredAccs.push(filteredAccounts[i]);
      }
    }
    setAccountsForPage(filteredAccs);
  };

  const onClickHandlerForward = () => {
    if (currentPage < allPages) {
      let newStartIndex = startIndex + step;
      setStartIndex(newStartIndex);
      accountsForPageFilter();
      let newCurrentPage = currentPage + 1;
      setCurrentPage(newCurrentPage);
      console.log(currentPage, startIndex, accountsForPage);
    }
  };
  const onClickHandlerBack = () => {
    if (currentPage > 1) {
      let newStartIndex = startIndex - step;
      setStartIndex(newStartIndex);
      accountsForPageFilter();
      let newCurrentPage = currentPage - 1;
      setCurrentPage(newCurrentPage);
      console.log(currentPage, startIndex, accountsForPage);
    }
  };
  const onClickPaginationPage = (e: MouseEvent<HTMLAnchorElement>) => {
    let targetNumber = Number(e.currentTarget.innerText);
    let newStartIndex = 0;
    if (currentPage < targetNumber) {
      newStartIndex = (targetNumber - 1) * step;
    } else if (currentPage > targetNumber) {
      newStartIndex = (targetNumber - 1) * step;
    }
    setStartIndex(newStartIndex);
    accountsForPageFilter();
    setCurrentPage(targetNumber);
  };

  const paginationButtons = () => {
    let buttonsMas = [];
    for (let i = 1; i <= allPages; i++) {
      buttonsMas.push(i);
    }
    return buttonsMas;
  };

  const pagBut = paginationButtons().map((butt) => (
    <NavLink
      key={butt}
      onClick={onClickPaginationPage}
      to={`/ilink-test/controlPanel/accounts/${butt}`}
      className={({ isActive }) => (isActive ? css.activePage : '')}
    >
      {butt}
    </NavLink>
  ));

  const acc = accountsForPage.map((acc) => (
    <Account key={acc.id} account={acc} />
  ));

  useEffect(() => {
    setBackAllPages(allPages);
    setAllPages(Math.ceil(filteredAccounts.length / step));
    if (Math.ceil(filteredAccounts.length / step) < backAllPages) {
      setCurrentPage(1);
      setStartIndex(0);
    }
    accountsForPageFilter();
    paginationButtons();
  }, [startIndex, filteredAccounts]);

  const navigate = useNavigate();
  const toFirstPage = () => navigate('/ilink-test/controlPanel/accounts/1');
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const showDropDown = () => {
    setOpenDropDown(true);
  };

  const setFilter = (accountFilter: AccountFilterType) => {
    changeAccountFilter(accountFilter);
    setOpenDropDown(false);
    toFirstPage();
  };

  return (
    <div className={css.accountList}>
      <div className={css.header}>
        <span>{'Участники'}</span>
        <div className={css.dropdown}>
          <div className={css.window} onClick={showDropDown}>
            {accountFilter === 'studies' ? 'Обучается' : accountFilter}
            <img src={drDown} alt="" />
          </div>
          {openDropDown && (
            <ul>
              <li onClick={() => setFilter('Все')}>{'Все'}</li>
              <li onClick={() => setFilter('Отчислен')}>{'Отчислен'}</li>
              <li onClick={() => setFilter('studies')}>{'Обучается'}</li>
              <li onClick={() => setFilter('Закончил')}>{'Закончил'}</li>
            </ul>
          )}
        </div>
      </div>
      {isLoading ? (
        <>
          <div className={css.tableHeader}>
            <span>ИФ УЧЕНИКА</span>
            <span>КРАТКАЯ ИНФОРМАЦИЯ</span>
            <span>СТАТУС</span>
          </div>
          <AccountSkeleton />
          <AccountSkeleton />
          <AccountSkeleton />
          <AccountSkeleton />
          <AccountSkeleton />
          <AccountSkeleton />
        </>
      ) : filteredAccounts.length !== 0 ? (
        <>
          {' '}
          <div className={css.table}>
            <div className={css.accountName}>
              <div className={css.tableHeader}>
                <span>ИФ УЧЕНИКА</span>
              </div>
              {acc}
            </div>
            <div className={css.infoStatus}>
              <div className={css.tableHeader}>
                <span>ИФ УЧЕНИКА</span>
                <span>КРАТКАЯ ИНФОРМАЦИЯ</span>
                <span>СТАТУС</span>
              </div>
              {acc}
            </div>
          </div>
          <div className={css.pagination}>
            <NavLink
              to={`/ilink-test/controlPanel/accounts/${
                currentPage >= 2 ? currentPage - 1 : 1
              }`}
              className={css.arrowLeft}
              onClick={onClickHandlerBack}
              data-style={currentPage === 1 ? 'disabled' : ''}
            ></NavLink>
            {pagBut}
            <NavLink
              to={`/ilink-test/controlPanel/accounts/${
                currentPage < allPages ? currentPage + 1 : allPages
              }`}
              className={css.arrowRight}
              onClick={onClickHandlerForward}
              data-style={currentPage === allPages ? 'disabled' : ''}
            ></NavLink>
          </div>
        </>
      ) : (
        <img src={dataEmpty} alt="" />
      )}
    </div>
  );
};
