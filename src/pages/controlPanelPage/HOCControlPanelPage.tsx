import { Route, Routes } from 'react-router-dom';
import dataEmpty from './img/Group 137336586.png';
import { AccountList } from '../../entities/account/model/AccountList';
import { useState } from 'react';
import { AccountType } from '../../entities/account/ui/Account';
import { accounts } from 'entities/account/model/accounts';
import { ControlPanelPage } from './ControlPanelPage';

export type FilterType = 'Все' | 'Обучается' | 'Закончил' | 'Отчислен';

export const HOCControlPanelPage = () => {
  const [filter, setFilter] = useState<FilterType>('Все');
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

  const changeFilter = (filter: FilterType) => {
    setFilter(filter);
    filterAccount(filter);
  };

  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <ControlPanelPage changeFilter={changeFilter} filter={filter} />
        }
      >
        <Route
          path={'accounts/*'}
          element={<AccountList filteredAccounts={filteredAccounts} />}
        ></Route>
        <Route path={'comments'} element={'Отзывы'}></Route>
        <Route path={'aboutMe'} element={'Обо мне'}></Route>
      </Route>
    </Routes>
  );
};
