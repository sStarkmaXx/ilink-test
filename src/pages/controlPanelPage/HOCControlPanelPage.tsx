import { Route, Routes } from 'react-router-dom';
import dataEmpty from './img/Group 137336586.png';
import { AccountList } from '../../entities/account/model/AccountList';
import { useState } from 'react';
import { AccountType } from '../../entities/account/ui/Account';
import { accounts } from 'entities/account/model/accounts';
import { ControlPanelPage } from './ControlPanelPage';
import { CommentList } from 'entities/comments/ui/CommentList';
import { comments } from '../../entities/comments/comments';
import { CommentStatusType, CommentType } from 'entities/comments/ui/Comment';
import { EditCommentsPage } from 'pages/editCommentsPage/EditCommentsPage';

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
    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    let admittedComments = [...filteredComments]
      .filter((com) => com.status === 'Допущен')
      .sort(function (a, b) {
        return (
          Date.parse(b.time.replace(pattern, '$3-$2-$1')) -
          Date.parse(a.time.replace(pattern, '$3-$2-$1'))
        );
      });
    let rejectedComments = [...filteredComments]
      .filter((com) => com.status === 'Отклонен')
      .sort(function (a, b) {
        return (
          Date.parse(b.time.replace(pattern, '$3-$2-$1')) -
          Date.parse(a.time.replace(pattern, '$3-$2-$1'))
        );
      });
    let onRreviewComments = [...filteredComments]
      .filter((com) => com.status === 'На проверке')
      .sort(function (a, b) {
        return (
          Date.parse(b.time.replace(pattern, '$3-$2-$1')) -
          Date.parse(a.time.replace(pattern, '$3-$2-$1'))
        );
      });

    let sortedComments = [];
    if (filter === 'Все') {
      setFilteredComments(filteredComments);
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

  const changeCommentStatus = (id: string, status: CommentStatusType) => {
    setFilteredComments(
      filteredComments.map((com) => (com.id === id ? { ...com, status } : com))
    );
  };

  //-----------------------------------------------------------------------------------------
  const [selectCom, setSelectCom] = useState<CommentType>();

  const selecter = (id: string) => {
    setSelectCom(filteredComments.find((com) => com.id === id));
    console.log(id);
  };

  const changeCommentText = (commentText: string) => {
    setFilteredComments(
      [...filteredComments].map((com) =>
        com.id === selectCom?.id ? { ...com, commentText } : com
      )
    );
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
          <Route
            path={'comments/*'}
            element={
              <CommentList
                filteredComments={filteredComments}
                changeCommentFilter={changeCommentFilter}
                commentFilter={commentFilter}
                changeCommentStatus={changeCommentStatus}
                changeCommentText={changeCommentText}
                selecter={selecter}
                selectCom={selectCom!}
              />
            }
          ></Route>
          <Route path={'aboutMe'} element={'Обо мне'}></Route>
        </Route>
      </Routes>
    </>
  );
};
