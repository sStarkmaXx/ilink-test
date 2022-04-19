import { FilterType } from 'pages/controlPanelPage/ControlPanelPage';
import { MouseEvent, useEffect, useState } from 'react';
import { Account, AccountType } from '../ui/Account';
import css from './AccountList.module.scss';
import { accounts } from './accounts';

type AccountListPropsType = {
  filter: FilterType;
};

export const AccountList: React.FC<AccountListPropsType> = ({ filter }) => {
  useEffect(() => {
    setAllPages(Math.ceil(accounts.length / step));
  }, []);

  const [startIndex, setStartIndex] = useState<number>(0);
  useEffect(() => accountsForPageFilter(), [startIndex]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allPages, setAllPages] = useState<number>(0);
  const [accountsForPage, setAccountsForPage] = useState<AccountType[]>([]);
  const step = 6;

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
  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    let targetNumber = Number(e.currentTarget.innerText);
    let newStartIndex = 0;
    if (currentPage < targetNumber) {
      newStartIndex = (targetNumber - 1) * step;
      setStartIndex(newStartIndex);
      accountsForPageFilter();
      setCurrentPage(targetNumber);
      console.log(targetNumber);
    } else if (currentPage > targetNumber) {
      newStartIndex = (targetNumber - 1) * step;
      setStartIndex(newStartIndex);
      accountsForPageFilter();
      setCurrentPage(targetNumber);
      console.log(targetNumber, accountsForPage);
    }
  };

  const accountsForPageFilter = () => {
    let filteredAccounts = accounts.filter((acc) => acc.status === filter);
    for (let i = startIndex; i < startIndex + step; i++) {
      if (accounts[i] === undefined) {
        filteredAccounts.push({
          id: '',
          name: '',
          lastName: '',
          info: '',
          status: null,
          photo: '',
        });
      } else {
        filteredAccounts.push(accounts[i]);
      }
    }
    setAccountsForPage(filteredAccounts);
  };

  const paginationButtons = () => {
    let buttonsMas: number[] = [];
    for (let i = 1; i <= allPages; i++) {
      buttonsMas.push(i);
    }
    return buttonsMas;
  };

  const pagBut = paginationButtons().map((but) => (
    <div className={css.paginationButton} onClick={onClickHandler}>
      {but}
    </div>
  ));

  const acc = accountsForPage.map((acc) => <Account account={acc} />);
  return (
    <div className={css.accountList}>
      <div className={css.table}>
        <div className={css.header}>
          <span>ИФ УЧЕНИКА</span>
          <span>КРАТКАЯ ИНФОРМАЦИЯ</span>
          <span>СТАТУС</span>
        </div>
        {acc}
      </div>
      <div className={css.pagination}>
        <div className={css.paginationButton} onClick={onClickHandlerBack}>
          {'<'}
        </div>
        {/* <div className={css.paginationButton} onClick={onClickHandler}>
          {currentPage === 1 ? currentPage : currentPage - 1}
        </div>
        <div className={css.paginationButton} onClick={onClickHandler}>
          {currentPage === allPages ? currentPage : currentPage + 1}
        </div>
        <div className={css.paginationButton} onClick={onClickHandler}>
          {allPages}
        </div> */}
        {pagBut}
        <div className={css.paginationButton} onClick={onClickHandlerForward}>
          {'>'}
        </div>
      </div>
    </div>
  );
};
