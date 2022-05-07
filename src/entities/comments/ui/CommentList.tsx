import { useState, useEffect } from 'react';
import { CommentStatusType } from './Comment';
import css from './CommentList.module.scss';
import drDown from './img/Arrow - Down 2.png';
import { Comment } from './Comment';
import { CommentFilterType } from 'pages/controlPanelPage/HOCControlPanelPage';
import { commentType, commentsModel } from '../comments';
import { useStore } from 'effector-react';
import { CommentSkeleton } from './commenSkeleton/CommentSkeleton';

type CommentListPropsType = {
  filteredComments: commentType[];
  changeCommentFilter: (commentFilter: CommentFilterType) => void;
  commentFilter: CommentFilterType;
  changeCommentStatus: (id: string, status: CommentStatusType) => void;
  changeCommentText: (newText: string) => void;
  selecter: (id: string) => void;
  selectCom: commentType;
};

export const CommentList: React.FC<CommentListPropsType> = ({
  filteredComments,
  changeCommentFilter,
  commentFilter,
  changeCommentStatus,
  changeCommentText,
  selecter,
  selectCom,
}) => {
  useEffect(() => commentsModel.getComments(), []);
  const isLoading = useStore(commentsModel.$loadingComments);
  const comments = useStore(commentsModel.$comments);
  console.log(comments);
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  console.log(filteredComments);
  const showDropDown = () => {
    setOpenDropDown(true);
  };

  const setFilter = (commentFilter: CommentFilterType) => {
    changeCommentFilter(commentFilter);
    setOpenDropDown(false);
  };

  const comment = comments.map((com) => (
    <Comment
      key={com.id}
      comment={com}
      changeCommentStatus={changeCommentStatus}
      changeCommentText={changeCommentText}
      selecter={selecter}
      selectCom={selectCom}
    />
  ));
  let displayValue = '';
  if (commentFilter === 'onCheck') {
    displayValue = 'onCheck';
  }
  if (commentFilter === 'Допущен') {
    displayValue = 'Сначала опубликованные';
  }
  if (commentFilter === 'Отклонен') {
    displayValue = 'Сначала отклоненные';
  }
  if (commentFilter === 'На проверке') {
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
              <li onClick={() => setFilter('onCheck')}>{'onCheck'}</li>
              <li onClick={() => setFilter('onCheck')}>
                {'Сначала неопубликованные'}
              </li>
              <li onClick={() => setFilter('Допущен')}>
                {'Сначала опубликованные'}
              </li>
              <li onClick={() => setFilter('Отклонен')}>
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
