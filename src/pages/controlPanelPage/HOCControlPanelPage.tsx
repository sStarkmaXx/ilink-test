import { Route, Routes } from 'react-router-dom';
import dataEmpty from './img/Group 137336586.png';
import { AccountList } from '../../entities/account/model/AccountList';
import { useState } from 'react';
import { accounts } from 'entities/account/model/accounts';
import { ControlPanelPage } from './ControlPanelPage';
import { CommentList } from 'entities/comments/ui/CommentList';
import { EditProfilePage } from 'pages/editProfilePage/EditProfilePage';
import { AccountType } from 'entities/account/ui/Account';

export type AccountFilterType = string;
//'Все' | 'Обучается' | 'Закончил' | 'Отчислен';

export const HOCControlPanelPage = () => {
  //-----------------------------фильтр аккаунтов-----------------------------------------
  const [accountFilter, setAccountFilter] = useState<AccountFilterType>('Все');
  const [filteredAccounts, setFilteredAccounts] =
    useState<AccountType[]>(accounts);
  const filterAccount = (filter: AccountFilterType) => {
    if (filter === 'Все') {
      setFilteredAccounts(accounts);
    } else {
      let filteredAccs = accounts.filter((acc) => acc.status === filter);
      setFilteredAccounts(filteredAccs);
    }
  };
  const changeAccountFilter = (filter: AccountFilterType) => {
    setAccountFilter(filter);
    filterAccount(filter);
  };

  return (
    <>
      <Routes>
        <Route path={'/'} element={<ControlPanelPage />}>
          <Route
            path={'accounts/*'}
            element={
              <AccountList
                filteredAccounts={filteredAccounts}
                changeFilter={changeAccountFilter}
                accountFilter={accountFilter}
              />
            }
          ></Route>
          <Route path={'comments/*'} element={<CommentList />}></Route>
          <Route path={'aboutMe'} element={<EditProfilePage />}></Route>
        </Route>
      </Routes>
    </>
  );
};
