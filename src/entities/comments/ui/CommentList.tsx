import { useState } from 'react';
import { CommentStatusType } from './Comment';
import css from './CommentList.module.scss';
import drDown from './img/Arrow - Down 2.png';
import { Comment } from './Comment';
import { CommentFilterType } from 'pages/controlPanelPage/HOCControlPanelPage';
import { commentType } from '../comments';

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
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  console.log(filteredComments);
  const showDropDown = () => {
    setOpenDropDown(true);
  };

  const setFilter = (commentFilter: CommentFilterType) => {
    changeCommentFilter(commentFilter);
    setOpenDropDown(false);
  };

  const comment = filteredComments.map((com) => (
    <Comment
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
      <div className={css.commentList}>{comment}</div>
    </div>
  );
};
