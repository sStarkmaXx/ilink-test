import css from './EditCommentsPage.module.scss';
import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { commentType } from 'entities/comments/comments';

type EditCommentsPagePropsType = {
  comment: commentType;
  changeCommentText: (newText: string) => void;
  showToast: () => void;
};

export const EditCommentsPage: React.FC<EditCommentsPagePropsType> = ({
  comment,
  changeCommentText,
  showToast,
}) => {
  const [text, setText] = useState<string>(comment.text);
  const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const disabled = text.trim() === '';
  const onClickChangeComText = () => {
    if (!disabled) {
      changeCommentText(text);
      showToast();
    }
  };

  return (
    <div className={css.layer}>
      <div className={css.editWindow}>
        <div className={css.header}>
          <p>Редактирование отзыва</p>
          <NavLink to={'/ilink-test/controlPanel/comments/'}></NavLink>
        </div>
        <label>Отзыв</label>
        <div className={css.length} data-length={`${text.length}/200`}>
          <textarea
            value={text}
            maxLength={200}
            onChange={changeText}
            style={disabled ? { border: 'red 1px solid' } : {}}
            placeholder={disabled ? 'Полее обязательно для заполнения!' : ''}
          ></textarea>
        </div>
        <div className={css.footer}>
          <NavLink
            to={'/ilink-test/controlPanel/comments/'}
            onClick={onClickChangeComText}
            className={disabled ? css.disabled : ''}
          >
            Подтвердить редактирование
          </NavLink>
          <NavLink to={'/ilink-test/controlPanel/comments/'}>Отмена</NavLink>
        </div>
      </div>
    </div>
  );
};
