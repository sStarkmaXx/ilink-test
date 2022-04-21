import { useState } from 'react';
import { CommentType } from './Comment';
import css from './CommentList.module.scss';
import drDown from './img/Arrow - Down 2.png';
import { Comment } from './Comment';
import { CommentFilterType } from 'pages/controlPanelPage/HOCControlPanelPage';

type CommentListPropsType = {
  filteredComments: CommentType[];
  changeCommentFilter: (commentFilter: CommentFilterType) => void;
  commentFilter: CommentFilterType;
};

export const CommentList: React.FC<CommentListPropsType> = ({
  filteredComments,
  changeCommentFilter,
  commentFilter,
}) => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const showDropDown = () => {
    setOpenDropDown(true);
  };

  const setFilter = (commentFilter: CommentFilterType) => {
    changeCommentFilter(commentFilter);
    setOpenDropDown(false);
  };

  const comment = filteredComments.map((com) => <Comment comment={com} />);
  let displayValue = '';
  if (commentFilter === 'Все') {
    displayValue = 'Все';
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
              <li onClick={() => setFilter('Все')}>{'Все'}</li>
              <li onClick={() => setFilter('На проверке')}>
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
