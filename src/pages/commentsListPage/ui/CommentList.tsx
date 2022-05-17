import { useState, useEffect } from 'react';
import css from './CommentList.module.scss';
import drDown from 'pages/accountListPage/img/Arrow - Down 2.png';
import { Comment } from 'pages/comment';
import {
  commentType,
  commentsModel,
  commentStatusType,
} from '../../../entities/comment/model/comment';
import { useStore } from 'effector-react';
import { CommentSkeleton } from 'pages/comment/ui/commenSkeleton/CommentSkeleton';

export const CommentList = () => {
  useEffect(() => {
    commentsModel.getComments();
  }, []);
  const comments = useStore(commentsModel.$comments);

  useEffect(() => {
    setFilteredComments(comments);
    filterComments('onCheck');
  }, [comments]);

  const isLoading = useStore(commentsModel.$loadingComments);

  const setFilter = (commentFilter: commentStatusType) => {
    changeCommentFilter(commentFilter);
    setOpenDropDown(false);
  };

  //---------------------------------------------------------commentFilter--------------------------------------------

  const [filteredComments, setFilteredComments] =
    useState<commentType[]>(comments);
  console.log('filteredComments', filteredComments);
  const [commentFilter, setCommentFilter] =
    useState<commentStatusType>('onCheck');

  const changeCommentFilter = (filter: commentStatusType) => {
    setCommentFilter(filter);
    filterComments(filter);
  };

  const sortByTime = (a: commentType, b: commentType) => {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  };

  const filterComments = (filter: commentStatusType) => {
    //let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    let admittedComments = [...comments]
      .filter((com) => com.status === 'approved')
      .sort((a, b) => sortByTime(a, b));
    let rejectedComments = [...comments]
      .filter((com) => com.status === 'declined')
      .sort((a, b) => sortByTime(a, b));
    let onRreviewComments = [...comments]
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
    if (filter === 'approved') {
      sortedComments = [
        ...admittedComments,
        ...onRreviewComments,
        ...rejectedComments,
      ];
      setFilteredComments(sortedComments);
    }
    if (filter === 'declined') {
      sortedComments = [
        ...rejectedComments,
        ...onRreviewComments,
        ...admittedComments,
      ];
      setFilteredComments(sortedComments);
    }
  };

  const comment = filteredComments.map((com) => (
    <Comment key={com.id} comment={com} />
  ));

  //-------------------------------dropDawn---------------------------------------------------
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const showDropDown = () => {
    setOpenDropDown(true);
  };

  let displayValue = '';
  if (commentFilter === 'approved') {
    displayValue = 'Сначала опубликованные';
  }
  if (commentFilter === 'declined') {
    displayValue = 'Сначала отклоненные';
  }
  if (commentFilter === 'onCheck') {
    displayValue = 'Сначала неопубликованные';
  }

  return (
    <div className={css.list}>
      <div className={css.header}>
        <span>{'Отзывы'}</span>
        <div className={css.dropdown}>
          <div className={css.window} onClick={showDropDown}>
            {displayValue}

            <img src={drDown} alt="" />
          </div>
          {openDropDown && (
            <ul>
              <li onClick={() => setFilter('onCheck')}>
                {'Сначала неопубликованные'}
              </li>
              <li onClick={() => setFilter('approved')}>
                {'Сначала опубликованные'}
              </li>
              <li onClick={() => setFilter('declined')}>
                {'Сначала отклоненные'}
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className={css.commentList}>
        {isLoading ? (
          <>
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </>
        ) : (
          comment
        )}
      </div>
    </div>
  );
};
