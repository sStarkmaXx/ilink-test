import { Route, Routes } from 'react-router-dom';
import dataEmpty from './img/Group 137336586.png';
import { AccountList } from '../../entities/account/model/AccountList';
import { useState } from 'react';
import { AccountType } from '../../entities/account/ui/Account';
import { accounts } from 'entities/account/model/accounts';
import { ControlPanelPage } from './ControlPanelPage';
import { CommentList } from 'entities/comments/ui/CommentList';
import { CommentStatusType } from 'entities/comments/ui/Comment';
import { EditProfilePage } from 'pages/editProfilePage/EditProfilePage';
import { useStore } from 'effector-react';
import { commentsModel, commentType } from 'entities/comments/comments';

export type AccountFilterType = string;
//'Все' | 'Обучается' | 'Закончил' | 'Отчислен';
export type CommentFilterType = string;
//'Все' | 'Допущен' | 'Отклонен' | 'На проверке';

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

  const comments = useStore(commentsModel.$comments);
  const [commentFilter, setCommentFilter] =
    useState<CommentFilterType>('onCheck');
  const [filteredComments, setFilteredComments] =
    useState<commentType[]>(comments);

  const sortByTime = (a: commentType, b: commentType) => {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  };

  const filterComments = (filter: CommentFilterType) => {
    //let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    let admittedComments = [...filteredComments]
      .filter((com) => com.status === 'Допущен')
      .sort((a, b) => sortByTime(a, b));
    let rejectedComments = [...filteredComments]
      .filter((com) => com.status === 'Не допущен')
      .sort((a, b) => sortByTime(a, b));
    let onRreviewComments = [...filteredComments]
      .filter((com) => com.status === 'onCheck')
      .sort((a, b) => sortByTime(a, b));

    let sortedComments = [];
    if (filter === 'onCheck') {
      setFilteredComments(filteredComments);
    }
    if (filter === 'onCheck') {
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
  const [selectCom, setSelectCom] = useState<commentType>();

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
          <Route path={'aboutMe'} element={<EditProfilePage />}></Route>
        </Route>
      </Routes>
    </>
  );
};
