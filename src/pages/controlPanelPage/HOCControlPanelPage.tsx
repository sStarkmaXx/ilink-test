import { Route, Routes } from 'react-router-dom';
import dataEmpty from './img/Group 137336586.png';
import { AccountList } from '../../entities/account/model/AccountList';
import { useState } from 'react';
import { AccountType } from '../../entities/account/ui/Account';
import { accounts } from 'entities/account/model/accounts';
import { ControlPanelPage } from './ControlPanelPage';
import { CommentList } from 'entities/comments/ui/CommentList';
import { comments } from '../../entities/comments/comments';
import { CommentType } from 'entities/comments/ui/Comment';

export type AccountFilterType = 'Все' | 'Обучается' | 'Закончил' | 'Отчислен';
export type CommentFilterType = 'Все' | 'Допущен' | 'Отклонен' | 'На проверке';

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
  //-----------------------------фильтр комментов-----------------------------------------
  const [commentFilter, setCommentFilter] = useState<CommentFilterType>('Все');
  const [filteredComments, setFilteredComments] =
    useState<CommentType[]>(comments);

  const filterComments = (filter: CommentFilterType) => {
    let admittedComments = [...comments]
      .filter((com) => com.status === 'Допущен')
      .sort(function (a, b) {
        return Date.parse(a.time) - Date.parse(b.time);
      });
    let rejectedComments = [...comments]
      .filter((com) => com.status === 'Отклонен')
      .sort(function (a, b) {
        return Date.parse(a.time) - Date.parse(b.time);
      });
    let onRreviewComments = [...comments]
      .filter((com) => com.status === 'На проверке')
      .sort(function (a, b) {
        return Date.parse(b.time) - Date.parse(a.time);
      });

    let sortedComments = [];
    if (filter === 'Все') {
      setFilteredComments(comments);
    }
    if (filter === 'На проверке') {
      sortedComments = [
        ...onRreviewComments,
        ...admittedComments,
        ...rejectedComments,
      ];
      setFilteredComments(sortedComments);
    }
    if (filter === 'Допущен') {
      sortedComments = [
        ...admittedComments,
        ...onRreviewComments,
        ...rejectedComments,
      ];
      setFilteredComments(sortedComments);
    }
    if (filter === 'Отклонен') {
      sortedComments = [
        ...rejectedComments,
        ...onRreviewComments,
        ...admittedComments,
      ];
      setFilteredComments(sortedComments);
    }
  };

  const changeCommentFilter = (filter: CommentFilterType) => {
    setCommentFilter(filter);
    filterComments(filter);
  };

  return (
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
        <Route
          path={'comments'}
          element={
            <CommentList
              filteredComments={filteredComments}
              changeCommentFilter={changeCommentFilter}
              commentFilter={commentFilter}
            />
          }
        ></Route>
        <Route path={'aboutMe'} element={'Обо мне'}></Route>
      </Route>
    </Routes>
  );
};
