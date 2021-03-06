import { useState, useEffect } from 'react';
import css from './CommentList.module.scss';
import drDown from './img/Arrow - Down 2.png';
import { Comment } from './Comment';
import { commentType, commentsModel, commentStatusType } from '../comments';
import { useStore } from 'effector-react';
import { CommentSkeleton } from './commenSkeleton/CommentSkeleton';

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
    displayValue = '?????????????? ????????????????????????????';
  }
  if (commentFilter === 'declined') {
    displayValue = '?????????????? ??????????????????????';
  }
  if (commentFilter === 'onCheck') {
    displayValue = '?????????????? ????????????????????????????????';
  }

  return (
    <div className={css.list}>
      <div className={css.header}>
        <span>{'????????????'}</span>
        <div className={css.dropdown}>
          <div className={css.window} onClick={showDropDown}>
            {displayValue}

            <img src={drDown} alt="" />
          </div>
          {openDropDown && (
            <ul>
              <li onClick={() => setFilter('onCheck')}>
                {'?????????????? ????????????????????????????????'}
              </li>
              <li onClick={() => setFilter('approved')}>
                {'?????????????? ????????????????????????????'}
              </li>
              <li onClick={() => setFilter('declined')}>
                {'?????????????? ??????????????????????'}
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
