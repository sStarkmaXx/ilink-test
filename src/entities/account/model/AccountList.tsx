import { MouseEvent, useEffect, useState } from 'react';
import { Account, AccountType } from '../ui/Account';
import css from './AccountList.module.scss';

type AccountListPropsType = {
  filteredAccounts: AccountType[];
};

export const AccountList: React.FC<AccountListPropsType> = ({
  filteredAccounts,
}) => {
  const step = 6;
  const [allPages, setAllPages] = useState<number>(0);
  const [backAllPages, setBackAllPages] = useState<number>(0);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [accountsForPage, setAccountsForPage] = useState<AccountType[]>([]);
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

  const paginationButtons = () => {
    let buttonsMas = [];
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

  useEffect(() => {
    setBackAllPages(allPages);
    setAllPages(Math.ceil(filteredAccounts.length / step));
    if (Math.ceil(filteredAccounts.length / step) < backAllPages) {
      setCurrentPage(1);
      setStartIndex(0);
      console.log('from useeffect', currentPage, startIndex, filteredAccounts);
    }
    accountsForPageFilter();
    paginationButtons();
  }, [startIndex, filteredAccounts]);

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
